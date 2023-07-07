import HeadTable from "@/components/HeadTable";
import Hr from "@/components/Hr";
import React from "react";
import InvoiceItem from "./InvoiceItem";

export default function Invoices({ data }) {
  return data.length === 0 ? (
    <h3>You don't make any Invoice yet</h3>
  ) : (
    <div>
      <HeadTable row={["Order ID", "Total", "Status"]} />
      <Hr />
      {data.map((item) => (
        <InvoiceItem key={item._id} items={item} />
      ))}
    </div>
  );
}
