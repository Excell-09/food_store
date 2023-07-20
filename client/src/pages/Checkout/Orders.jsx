import Hr from "@/components/Hr";
import React from "react";

export default function Orders({ items, deliveryCost }) {
  const subTotal = items.map((item) => item.price).reduce((curr, item) => curr + item, 0);
  return items.length === 0 ? (
    <div>No Products in your Cart</div>
  ) : (
    <div>
      <div className="flex mt-3">
        <h6 className="flex-1">Sub total</h6>
        <h6 className="flex-1">Rp {subTotal.toLocaleString("idr")}</h6>
      </div>
      <Hr />
      <div className="flex">
        <h6 className="flex-1">Ongkir</h6>
        <h6 className="flex-1">Rp {deliveryCost.toLocaleString("idr")}</h6>
      </div>
      <Hr />
      <div className="flex">
        <h6 className="flex-1 font-semibold text-lg">Total</h6>
        <h6 className="flex-1 font-semibold text-lg">Rp {(subTotal + deliveryCost).toLocaleString("idr")}</h6>
      </div>
    </div>
  );
}
