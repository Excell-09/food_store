import React from "react";
import { BsCart2 } from "react-icons/bs";

export default function CartNavItem({ handleLink }) {
  return (
    <div className="relative px-3" onClick={handleLink("/checkout")}>
      <small className="absolute bg-red-500 w-5 text-center text-white rounded-full right-1 -top-1">0</small>
      <BsCart2 className="text-white text-3xl cursor-pointer" />
    </div>
  );
}
