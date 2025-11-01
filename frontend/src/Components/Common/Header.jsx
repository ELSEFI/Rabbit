import React from "react";
import { Topbar } from "../Layout/Topbar";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/* TOP BAR */}
      <Topbar />
      {/* NAVBAR */}
      <Navbar />
      {/* CARD DRAWER */}
    </header>
  );
};
