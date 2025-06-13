import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import SpecialRoutes from './routes/SpecialRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <div className={!isAdminRoute ? 'pt-16' : ''}>
        <SpecialRoutes />
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
