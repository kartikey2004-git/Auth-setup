import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Auth from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import { Toaster } from "./components/ui/sonner";
import Memories from "./pages/Memories";
import Blogs from "./pages/Blogs";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/verify-email",
        element: <EmailVerify />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/memories",
        element: <Memories />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Toaster />
    </>
  );
};

export default App;
