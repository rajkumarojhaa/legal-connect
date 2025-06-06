import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FindLawyer from '../pages/FindLawyer';
import BlogPage from '../pages/BlogPage';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ConfirmationPage from '../pages/ConfirmationPage';
import BookingPage from "../pages/BookingPage"
import PaymentPage from "../pages/PaymentPage";



const SpecialRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-lawyer" element={<FindLawyer />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
       <Route path="/book/:lawyerId" element={<BookingPage />} />
       <Route path="/book/:lawyerId/payment" element={<PaymentPage />} />
      <Route path="/book/:lawyerId/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
};

export default SpecialRoutes;
