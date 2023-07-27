import React from "react";
import ArrowDropDown from "./ArrowDropDown";
import HeadTable from "@/components/HeadTable";
import Hr from "@/components/Hr";

export default function InvoiceItem({ items }) {
  const [isOpenOrders, setIsOpenOrders] = React.useState(false);

  const COLOR = {
    waiting_payment: "text-red-500",
    paid: "text-green-500",
  };

  const handleOpenDropdown = () => setIsOpenOrders((value) => !value);
  return (
    <div key={items._id} className="relative overflow-hidden">
      <div className="flex z-50">
        <h6 className="flex-1 max-sm:text-sm flex gap-3">
          <span
            className={`max-w-[25px] cursor-pointer flex-1 ${
              isOpenOrders ? "rotate-0" : "-rotate-90"
            } transition-all duration-300`}
            onClick={handleOpenDropdown}
          >
            <ArrowDropDown />
          </span>
          <span className="flex-1">#{items.order.order_numbers}</span>
        </h6>
        <h6 className="flex-1 max-sm:text-sm">
          Rp {items.total.toLocaleString("idr")}
        </h6>
        <h6 className={`flex-1 max-sm:text-sm ${COLOR[items.payment_status]}`}>
          {items.payment_status}
        </h6>
      </div>

      <div
        className={`${
          isOpenOrders ? "max-h-[500px] visible" : "max-h-0 invisible"
        } transition-all duration-500 ease-in-out overflow-y-auto`}
      >
        <Hr widthThin />
        <div className="px-3 py-2 sm:px-10">
          <HeadTable row={["Item", "QTY", "Price"]} />
          <Hr />
          {items?.order?.order_items.map((order) => (
            <React.Fragment key={order._id}>
              <div className="flex">
                <h6 className="flex-1">{order.name}</h6>
                <h6 className="flex-1">{order.qty}</h6>
                <h6 className="flex-1">
                  Rp {order.price.toLocaleString("idr")}
                </h6>
              </div>
              <Hr widthThin />
            </React.Fragment>
          ))}
        </div>
      </div>
      <Hr />
    </div>
  );
}
