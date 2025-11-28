import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
