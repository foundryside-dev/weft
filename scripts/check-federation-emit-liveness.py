#!/usr/bin/env python3
"""Check Weft federation emit wiring for Python-scanned members.

This is a launch preflight for the Wardline -> Filigree scan-results emit path.
It validates the configured emit URL in each member repo, validates the
server-mode Filigree registry entry, and optionally performs a live no-finding
POST to prove the daemon accepts the scoped route.
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


MEMBERS = {
    "filigree": Path("/home/john/filigree"),
    "wardline": Path("/home/john/wardline"),
    "legis": Path("/home/john/legis"),
    "lacuna": Path("/home/john/lacuna"),
}

EXPECTED_PORT = 8749
EXPECTED_PATH_TEMPLATE = "/api/p/{project}/weft/scan-results"


@dataclass
class CheckResult:
    project: str
    ok: bool = True
    details: list[str] = field(default_factory=list)
    url: str | None = None
    http_status: str | None = None

    def fail(self, detail: str) -> None:
        self.ok = False
        self.details.append(detail)

    def note(self, detail: str) -> None:
        self.details.append(detail)


def _load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def _wardline_filigree_url(repo: Path) -> str | None:
    cfg_path = repo / ".mcp.json"
    if not cfg_path.exists():
        return None
    cfg = _load_json(cfg_path)
    wardline = cfg.get("mcpServers", {}).get("wardline")
    if not isinstance(wardline, dict):
        return None
    args = wardline.get("args")
    if not isinstance(args, list):
        return None
    try:
        idx = args.index("--filigree-url")
    except ValueError:
        return None
    if idx + 1 >= len(args) or not isinstance(args[idx + 1], str):
        return None
    return args[idx + 1]


def _validate_url(project: str, result: CheckResult) -> None:
    expected_path = EXPECTED_PATH_TEMPLATE.format(project=project)
    if result.url is None:
        result.fail("missing mcpServers.wardline --filigree-url")
        return

    parsed = urllib.parse.urlparse(result.url)
    if parsed.scheme not in {"http", "https"}:
        result.fail(f"emit URL has unsupported scheme: {parsed.scheme or '<none>'}")
    if parsed.port != EXPECTED_PORT:
        result.fail(f"emit URL must point at :{EXPECTED_PORT}; got {parsed.netloc or '<none>'}")
    if parsed.path != expected_path:
        result.fail(f"emit URL path must be {expected_path}; got {parsed.path or '<none>'}")
    if parsed.query:
        result.fail("emit URL must use path scoping, not query parameters")


def _validate_registration(project: str, repo: Path, server_cfg: dict[str, Any], result: CheckResult) -> None:
    projects = server_cfg.get("projects", {})
    if not isinstance(projects, dict):
        result.fail("server.json has no projects object")
        return

    store_dir = str(repo / ".weft" / "filigree")
    entry = projects.get(store_dir)
    if not isinstance(entry, dict):
        result.fail(f"missing canonical server registration: {store_dir}")
    elif entry.get("prefix") != project:
        result.fail(f"canonical registration prefix must be {project}; got {entry.get('prefix')!r}")

    legacy_store_dir = str(repo / ".filigree")
    legacy_entry = projects.get(legacy_store_dir)
    if isinstance(legacy_entry, dict) and legacy_entry.get("prefix") == project:
        result.fail(f"legacy server registration is still present: {legacy_store_dir}")


def _read_token(repo: Path, result: CheckResult) -> str | None:
    token_path = repo / ".weft" / "filigree" / "federation_token"
    try:
        token = token_path.read_text(encoding="utf-8").strip()
    except FileNotFoundError:
        result.fail(f"missing federation token: {token_path}")
        return None
    if not token:
        result.fail(f"empty federation token: {token_path}")
        return None
    return token


def _probe(project: str, repo: Path, result: CheckResult, timeout: float) -> None:
    if result.url is None:
        result.http_status = "skipped"
        return
    token = _read_token(repo, result)
    if token is None:
        result.http_status = "skipped"
        return

    payload = json.dumps(
        {
            "scan_source": "weft-emit-liveness-preflight",
            "findings": [],
            "scanned_paths": [],
            "create_observations": False,
            "mark_unseen": False,
            "complete_scan_run": False,
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        result.url,
        data=payload,
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "weft-emit-liveness-preflight/1",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            status = response.getcode()
    except urllib.error.HTTPError as exc:
        status = exc.code
    except urllib.error.URLError as exc:
        result.http_status = "000"
        result.fail(f"live probe could not reach daemon: {exc.reason}")
        return

    result.http_status = str(status)
    if 200 <= status < 300:
        result.note(f"live probe accepted by {project} route ({status})")
    elif status == 400:
        result.fail("live probe returned 400: unscoped or invalid request")
    elif status == 401:
        result.fail("live probe returned 401: bad token or unregistered project")
    elif status == 404:
        result.fail("live probe returned 404: wrong route or missing project mount")
    else:
        result.fail(f"live probe returned unexpected HTTP {status}")


def _run(args: argparse.Namespace) -> list[CheckResult]:
    server_cfg = _load_json(args.server_json)
    results: list[CheckResult] = []

    for project, repo in MEMBERS.items():
        result = CheckResult(project=project)
        result.url = _wardline_filigree_url(repo)
        _validate_url(project, result)
        _validate_registration(project, repo, server_cfg, result)
        if args.live:
            _probe(project, repo, result, args.timeout)
        results.append(result)

    return results


def _print_text(results: list[CheckResult], *, live: bool) -> None:
    print("PROJECT   STATUS  HTTP  URL")
    for result in results:
        status = "PASS" if result.ok else "FAIL"
        http_status = result.http_status if live else "-"
        print(f"{result.project:<9} {status:<6} {http_status or '-':<5} {result.url or '<missing>'}")
        for detail in result.details:
            print(f"  - {detail}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate Weft federation emit liveness.")
    parser.add_argument(
        "--server-json",
        type=Path,
        default=Path.home() / ".config" / "filigree" / "server.json",
        help="Filigree server-mode registry path.",
    )
    parser.add_argument("--live", action="store_true", help="POST a no-finding probe to each scoped emit URL.")
    parser.add_argument("--json", action="store_true", help="Emit machine-readable JSON.")
    parser.add_argument("--timeout", type=float, default=5.0, help="HTTP probe timeout in seconds.")
    args = parser.parse_args()

    try:
        results = _run(args)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"weft emit liveness check failed to load configuration: {exc}", file=sys.stderr)
        return 2

    if args.json:
        print(json.dumps([result.__dict__ for result in results], indent=2, sort_keys=True))
    else:
        _print_text(results, live=args.live)

    return 0 if all(result.ok for result in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
