import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Auth from "./pages/Login";

const App = () => {
  return <div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/verify-email" element={<EmailVerify/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
  </div>;
};

export default App;