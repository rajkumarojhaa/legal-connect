import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
// import FindLawyer from '../pages/FindLawyer';
import BlogPage from '../pages/BlogPage';
// import Signup from '../pages/Signup';
// import Signin from '../pages/Signin';

const SpecialRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/find-lawyer" element={<FindLawyer />} /> */}
      <Route path="/blog" element={<BlogPage />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* <Route path="/signin" element={<Signin />} /> */}
    </Routes>
  );
};

export default SpecialRoutes;
