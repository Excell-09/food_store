import React from "react";

export default function Hr({ widthThin }) {
  return <hr className={`${widthThin ? "border-b-[1px]" : "border-b-2"} border-gray-300 my-2`} />;
}
