import React from "react";

export default function Logo({handleLink}) {
  return (
    <h6 onClick={handleLink("/")} className="text-2xl text-white cursor-pointer">
      POST
    </h6>
  );
}
