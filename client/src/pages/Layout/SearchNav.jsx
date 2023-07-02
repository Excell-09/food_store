import React from "react";

export default function SearchNav({ Search, onChange }) {
  return (
    <div className="w-full mt-3 sm:mt-0 max-sm:order-last sm:order-0 sm:max-w-2xl">
      <Search placeholder="Search Food" onChange={onChange} enterButton />
    </div>
  );
}
