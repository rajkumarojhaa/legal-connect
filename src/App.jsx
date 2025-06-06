import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SpecialRoutes from './routes/SpecialRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar />
        <div className=" pt-16">
          <SpecialRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;