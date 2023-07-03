import Container from "@/components/Container";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AccountLayout() {
  const itemNavLinkAccount = [
    { label: "Profile", to: "/account" },
    { label: "Pemesanan", to: "/account/pemesanan" },
    { label: "Alamat", to: "/account/alamat" },
    { label: "Logout", to: "", eventClick: () => {} },
  ];
  const [currentRouter, setCurrentRouter] = React.useState("/account");

  return (
    <Container>
      <div className="border-2 border-gray-300 mt-5">
        <div className="bg-gray-200 p-2 border-b-2 border-gray-300">
          <h3 className="text-slate-600 font-semibold">Account</h3>
        </div>

        <div className="m-3 flex gap-5 max-md:flex-col">
          <div className="border-gray-300 border-2 md:max-w-[200px] flex flex-col flex-1">
            {itemNavLinkAccount.map((item, i) => {
              if (!item.to) {
                return (
                  <button key={i} className="text-start p-2 text-gray-600" onClick={item.eventClick}>
                    {item.label}
                  </button>
                );
              }
              return (
                <NavLink
                  to={item.to}
                  key={i}
                  className={`text-gray-600 border-b-2 p-2 border-gray-300 ${
                    currentRouter === item.to && "bg-blue-500"
                  }`}
                  onClick={() => setCurrentRouter(item.to)}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
          <div className="border-gray-300 border-2 flex-1 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
}
