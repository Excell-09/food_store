import Hr from "@/components/Hr";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Addresses({ addresses, onChange }) {
  const handleChange = ({ target }) => onChange(target.value);

  return addresses.length === 0 ? (
    <>
      <h3 className="mb-2">You don't have any Address</h3>
      <Link to={"/account/alamat"}>
        <Button type="default">Add Address</Button>
      </Link>
    </>
  ) : (
    <div className="">
      <div className="flex bg-slate-300 mt-3">
        <h6 className="flex-1 max-w-[80px]"></h6>
        <h6 className="flex-1">Nama</h6>
        <h6 className="flex-1">Alamat</h6>
      </div>
      <div>
        {addresses.map((item, i) => (
          <React.Fragment key={item._id}>
            <div className="flex py-2">
              <div className="flex-1 max-w-[80px] text-center">
                <input
                  id={item.nama}
                  className=""
                  type="radio"
                  defaultChecked={i === 0}
                  value={item._id}
                  onChange={handleChange}
                  name={"option-address"}
                />
              </div>
              <label htmlFor={item.nama} className="flex-1">
                {item.nama}
              </label>
              <label
                htmlFor={item.nama}
                className="flex-1"
              >{`${item.provinsi}, ${item.kecamatan}, ${item.kelurahan}, ${item.kelurahan}`}</label>
            </div>
            <Hr widthThin />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
