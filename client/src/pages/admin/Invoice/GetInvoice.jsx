import Loading from "@/components/Loading";
import appAxiosToken from "@/utils/AppAxiosToken";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";

function InvoiceItem({ invoice }) {
  const COLOR = {
    waiting_payment: "text-red-500",
    paid: "text-green-500",
  };

  return (
    <div className="bg-white rounded-md font-medium p-5 shadow-md flex justify-between items-center">
      <div className="space-x-2">
        <span>#{invoice?.user?.customer_id}.</span>
        <span>{invoice?.user?.email}</span>
        <span className={`${COLOR[invoice?.payment_status]}`}>
          {invoice?.payment_status}
        </span>
      </div>

      <div className="space-x-3">
        <Button>Update</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function GetInvoice() {
  const invoices = useQuery({
    queryKey: ["getInvoice"],
    queryFn: async () => appAxiosToken("/api/invoice/invoices"),
  });

  if (invoices.isLoading) {
    return (
      <section className="text-center">
        <Loading />
      </section>
    );
  }

  if (invoices.data.data.length === 0) {
    return <section>0 Invoice item</section>;
  }

  return (
    <section>
      <h6 className="text-lg mb-3">Invoices List</h6>
      <div className="space-y-2">
        {invoices.data.data.map((item) => (
          <InvoiceItem key={item._id} invoice={item} />
        ))}
      </div>
    </section>
  );
}
