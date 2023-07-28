import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TfiArrowCircleLeft } from "react-icons/tfi";

export default function MenuAdmin({ label, items }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleActive = (to) => {
    navigate(to);
  };

  const isCurrentActive = () =>
    items.some((item) => item.to === location.pathname);

  return (
    <div className="relative">
      <div
        className={`flex justify-between p-3 ${
          isCurrentActive()
            ? "bg-slate-500 hover:bg-slate-500"
            : "hover:bg-slate-500/40"
        }`}
        onClick={() => handleActive(items[0].to)}
      >
        <Link to={items[0].to} className="text-xl font-medium">
          <h6>{label}</h6>
        </Link>
        <TfiArrowCircleLeft
          size={30}
          className={`${
            isCurrentActive() ? "-rotate-90" : "rotate-0"
          } transition-all duration-300`}
        />
      </div>
      <div
        className={`flex flex-col overflow-hidden ${
          isCurrentActive() ? "max-h-[500px] visible" : "max-h-0 invisible"
        } transition-all duration-500`}
      >
        {items.map((item, i) => (
          <Link
            className={`${
              item.to === location.pathname
                ? "text-white bg-slate-500/70"
                : "text-slate-300"
            } p-2 hover:bg-slate-600 px-6`}
            key={i}
            to={item.to}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
