import React from "react";

export default function Loading({ center }) {
  return <h6 className={`${center && "text-center"}`}>Loading...</h6>;
}
