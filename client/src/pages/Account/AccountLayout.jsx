import Container from "@/components/Container";
import { logout } from "@/features/authentication/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export default function AccountLayout() {
  const dispatch = useDispatch();
  const itemNavLinkAccount = [
    { label: "Profile", to: "/account" },
    { label: "Pemesanan", to: "/account/pemesanan" },
    { label: "Alamat", to: "/account/alamat" },
    {
      label: "Logout",
      to: "",
      eventClick: () => {
        dispatch(logout());
      },
    },
  ];
  const [currentRouter, setCurrentRouter] = React.useState(window.location.pathname);

  return (
    <Container>
      <div className="border-2 border-gray-300 mt-5">
        <div className="bg-gray-200 p-2 border-b-2 border-gray-300">
          <h3 className="text-slate-600 font-semibold">Account</h3>
        </div>

        <div className="m-3 flex gap-5 max-md:flex-col md:items-start">
          <div className="border-gray-300 border-2 md:max-w-[200px] flex flex-col flex-1">
            {itemNavLinkAccount.map((item, i) => {
              if (!item.to) {
                return (
                  <button key={i} className="text-start p-2 text-gray-600 hover:bg-slate-200" onClick={item.eventClick}>
                    {item.label}
                  </button>
                );
              }
              return (
                <NavLink
                  to={item.to}
                  key={i}
                  className={` border-b-2 p-2 border-gray-300 ${
                    currentRouter === item.to ? "bg-blue-500 text-white" : "hover:bg-slate-200 text-gray-600"
                  }`}
                  onClick={() => setCurrentRouter(item.to)}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
          <div className="border-gray-300 border-2 flex-1 p-2 min-h-[170px]">
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
}
