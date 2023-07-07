import React from "react";

export default function HeadTable({ row }) {
  return (
    <div className="flex">
      {row.map((item, i) => (
        <h3 className="flex-1 font-medium text-slate-700" key={i}>{item}</h3>
      ))}
    </div>
  );
}
