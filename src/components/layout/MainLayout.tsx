import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';

export const MainLayout = () => (
  <>
    <Nav />
    <main id="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);
