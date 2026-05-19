import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MinimalLayout } from '@/components/layout/MinimalLayout';
import { ScrollManager } from '@/router/ScrollManager';
import { Home } from '@/pages/Home';
import { Audit } from '@/pages/Audit';

const App = () => (
  <BrowserRouter>
    <ScrollManager />

    <a href="#main-content" className="skip-link">
      Skip to content
    </a>

    <div className="bg-wash" aria-hidden="true" />
    <div className="bg-corners" aria-hidden="true" />

    <Routes>
      <Route element={<MinimalLayout />}>
        <Route path="/audit" element={<Audit />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>

    <Analytics />
  </BrowserRouter>
);

export default App;
