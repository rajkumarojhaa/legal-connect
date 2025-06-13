import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Home from '../pages/Home';
import FindLawyer from '../pages/FindLawyer';
import BlogPage from '../pages/BlogPage';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ConfirmationPage from '../pages/ConfirmationPage';
import BookingPage from "../pages/BookingPage"
import PaymentPage from "../pages/PaymentPage";
import Services from "../pages/Services";
import MemoizedAdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/admin/Dashboard"
// import Appointments from "../pages/admin/Appointments";
import LegalAI from "../pages/admin/LegalAI";



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
      <Route path="/services/:serviceType" element={<Services />} />

       {/* Admin Routes (Protected if needed) */}
      <Route path="/admin" element={<MemoizedAdminLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="appointments" element={<Appointments />} /> */}
        {/* <Route path="add-lawyer" element={<AddLawyer />} /> */}
        {/* <Route path="write-blog" element={<WriteBlog />} /> */}
        {/* <Route path="edit-profile" element={<EditProfile />} /> */}
        {/* <Route path="case-management" element={<CaseManagement />} /> */}
        {/* <Route path="clients" element={<Clients />} /> */}
        <Route path="legal-ai" element={<LegalAI />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
  
    </Routes>
  );
};

export default SpecialRoutes;
