import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TfiArrowCircleLeft } from "react-icons/tfi";

export default function MenuAdmin({ label, items }) {
  const [active, setActive] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleActive = (to) => {
    setActive((value) => !value);
    navigate(to);
  };

  return (
    <div className="relative my-3">
      <div
        className="flex justify-between hover:bg-slate-500 px-3 py-2"
        onClick={() => handleActive(items[0].to)}
      >
        <Link to={items[0].to} className="text-xl font-medium">
          <h6>{label}</h6>
        </Link>
        <TfiArrowCircleLeft
          size={30}
          className={`${
            active ? "-rotate-90" : "rotate-0"
          } transition-all duration-500`}
        />
      </div>
      <div
        className={`flex flex-col overflow-hidden ${
          active ? "max-h-[500px] visible" : "max-h-0 invisible"
        } transition-all duration-500 px-3`}
      >
        {items.map((item, i) => (
          <Link
            className={`${
              item.to === location.pathname ? "text-white" : "text-slate-300"
            } p-2 hover:bg-slate-500`}
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
