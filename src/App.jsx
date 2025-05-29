import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SpecialRoutes from './routes/SpecialRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow pt-16">
          <SpecialRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;