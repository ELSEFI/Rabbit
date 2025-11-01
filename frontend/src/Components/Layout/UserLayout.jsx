import React from "react";
import { Header } from "../Common/Header";
import { Footer } from "../Common/Footer";
import { Home } from "../../pages/Home";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <>
      {/* HEADER */}
      <Header />
      {/* MAIN CONTENT */}
      <main>
        <Outlet />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
};
