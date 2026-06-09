import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader.jsx';
import { SiteFooter } from './components/SiteFooter.jsx';
import { Landing } from './routes/Landing.jsx';
import { MemberPage } from './routes/MemberPage.jsx';
import { Demos } from './routes/Demos.jsx';
import { Build } from './routes/Build.jsx';
import { MEMBERS } from './data/roster.js';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">skip to content</a>
      <SiteHeader />
      <main id="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          {MEMBERS.map((m) => (
            <Route key={m.id} path={`/members/${m.id}`} element={<MemberPage id={m.id} />} />
          ))}
          <Route path="/demos" element={<Demos />} />
          <Route path="/demos/:which" element={<Demos />} />
          <Route path="/build" element={<Build />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
