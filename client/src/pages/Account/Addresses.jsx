import HeadTable from "@/components/HeadTable";
import Hr from "@/components/Hr";
import { Pagination } from "antd";
import React from "react";

export default function CardAddress({ addresses, currentPage, totalPage, setCurrentPage }) {
  return addresses.length === 0 ? (
    <h3 className="text-center">There are no recods to display</h3>
  ) : (
    <>
      <div>
        <HeadTable row={["Nama", "Detail"]} />

        {addresses.map((item) => (
          <React.Fragment key={item._id}>
            <Hr/>
            <div className="flex px-3">
              <p className="flex-1">{item.nama}</p>
              <p className="flex-1">{`${item.provinsi}, ${item.kecamatan}, ${item.kelurahan}, ${item.kelurahan}`}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Pagination
        className="mt-5"
        current={currentPage}
        total={totalPage}
        defaultPageSize={10}
        onChange={(value) => setCurrentPage(value)}
      />
    </>
  );
}
