import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ item }) {
  return (
    <>
      {item.map((item, i) => (
        <Link key={i} to={item.to} className="w-full" onClick={item?.handleClick}>
          <Button className="w-full text-capitalize" type="text">
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  );
}
