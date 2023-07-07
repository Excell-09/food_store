import React from "react";
import appAxiosToken from "@/utils/AppAxiosToken";
import Loading from "@/components/Loading";
const Invoices = React.lazy(() => import("./Invoices"));

export default function Pemesanan() {
  const [invoices, setInvoices] = React.useState([]);

  React.useEffect(() => {
    appAxiosToken("/api/invoice").then((res) => setInvoices(res.data));
  }, []);

  return (
    <div>
      <React.Suspense fallback={<Loading center />}>
        <Invoices data={invoices} />
      </React.Suspense>
    </div>
  );
}
