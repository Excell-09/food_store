import Hr from "@/components/Hr";
import { Button } from "antd";
import React from "react";
import MenuAdmin from "./MenuAdmin";
import MENUADMINITEMS from "./MenuAdminItemList";
import { logout } from "@/features/authentication/authSlice";
import { useDispatch } from "react-redux";

export default function NavbarAdmin() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-blue-500 p-3">
        <Button
          size="large"
          type="primary"
          danger
          className="block ms-auto font-semibold"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </div>

      <nav className="bg-slate-700 fixed top-0 left-0 h-screen man-w-[250px] text-white shadow-lg overflow-y-auto">
        <h3 className="text-2xl font-black m-5 text-center">
          Food Store Admin
        </h3>
        <Hr />
        <div>
          {MENUADMINITEMS.map((item, i) => (
            <MenuAdmin key={i} label={item.label} items={item.navItems} />
          ))}
        </div>
      </nav>
    </>
  );
}
