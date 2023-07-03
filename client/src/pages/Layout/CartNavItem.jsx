import React from "react";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CartNavItem({ handleLink }) {
  const totalItem = useSelector((state) => state.cart.totalItem);
  return (
    <div className="relative px-3" onClick={handleLink("/cart")}>
      <small className="absolute bg-red-500 w-5 text-center text-white rounded-full right-1 -top-1">{totalItem}</small>
      <BsCart2 className="text-white text-3xl cursor-pointer" />
    </div>
  );
}
