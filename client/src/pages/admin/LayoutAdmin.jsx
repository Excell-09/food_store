import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

export default function LayoutAdmin() {
  return (
    <>
    <header>
      <NavbarAdmin/>
    </header>
      <main className="ms-[250px] p-5">
        <Outlet />
      </main>
    </>
  );
}
