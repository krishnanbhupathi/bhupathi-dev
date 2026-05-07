import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { SectionLink } from '@/components/layout/SectionLink';
import { ScrollManager } from '@/router/ScrollManager';
import { Home } from '@/pages/Home';

const App = () => (
  <BrowserRouter>
    <ScrollManager />

    <SectionLink section="main-content" className="skip-link">
      Skip to content
    </SectionLink>

    <div className="bg-wash" aria-hidden="true" />
    <div className="bg-corners" aria-hidden="true" />

    <Nav />

    <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>

    <Footer />
    <Analytics />
  </BrowserRouter>
);

export default App;
