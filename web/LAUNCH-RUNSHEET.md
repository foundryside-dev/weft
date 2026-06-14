# Weft website — launch run sheet

Close-out checklist to take the built sites live. Build work is done; everything
below is operator action. Tracker: `weft-9435784215`.

DNS target for every subdomain CNAME record: **`foundryside-dev.github.io`**

## 1. Land the 4 RC-branch sites on `main`
These have the site committed on their release branch; they deploy when it merges to main.

- [ ] loomweave — merge `rc4` → `main`
- [ ] filigree — merge `release/3.0.0` → `main`
- [ ] wardline — merge `rc5` → `main`
- [ ] legis — merge `rc5` → `main`

(weft hub, warpline, lacuna are already on `main`.)

## 2. Per repo — enable Pages + DNS (all 7)
For each: weft, loomweave, filigree, wardline, legis, warpline, lacuna

- [ ] Repo → Settings → Pages → Source = **GitHub Actions**
- [ ] Add DNS record: `<repo>.foundryside.dev` CNAME → `foundryside-dev.github.io`
- [ ] Confirm the `deploy-site` workflow ran green and the subdomain serves

## 3. Confirm old deploys are gone (already retired in code — just verify)
- [ ] loomweave — no stray `gh-pages` branch still serving the old `www/`
- [ ] filigree / wardline — no leftover mkdocs `gh-pages` deploy
- [ ] Each subdomain resolves to the new Astro site, not an old one

## 4. Polish (optional, not blocking)
- [ ] Supply real brand assets (logo / glyph / fonts) — current ones are design-system proposals
- [ ] Supply a real Filigree dashboard screenshot — currently an illustrative recreation
- [ ] (Optional) pin spokes to a tagged `@weft/site-kit` instead of `weft#main`

## Quick verify (after DNS propagates)
- [ ] All 7 subdomains load on the light theme
- [ ] Hub roster + matrix links open the right member subdomains
- [ ] No 404s on cross-member links
