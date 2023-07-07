import Container from "@/components/Container";
import Hr from "@/components/Hr";
import appAxiosToken from "@/utils/AppAxiosToken";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Invoices() {
  const [invoice, setInvoice] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    appAxiosToken("/api/invoice/" + id)
      .then((res) => {

        if (res.data.error === 1) {
          navigate("/");
          return;
        }
        setInvoice(res.data);
      })
      .catch(() => navigate("/"));
  }, []);

  return (
    <Container>
      <div className="mt-5 border-2  border-slate-300">
        <div className="bg-slate-200 text-slate-600 p-2 border-b-2 border-slate-300">Invoices</div>
        <div className="p-3">
          {invoice !== null ? (
            <div>
              <h3 className="text-2xl mb-5">Invoice</h3>
              <div className="flex">
                <h6 className="flex-1">Status</h6>
                <h6 className="flex-1">{invoice.payment_status}</h6>
              </div>
              <Hr widthThin />

              <div className="flex">
                <h6 className="flex-1">Order ID</h6>
                <h6 className="flex-1">#{invoice.order?.order_numbers}</h6>
              </div>
              <Hr widthThin />

              <div className="flex">
                <h6 className="flex-1">Total amount</h6>
                <h6 className="flex-1">Rp {invoice?.total?.toLocaleString("idr")}</h6>
              </div>
              <Hr widthThin />

              <div className="flex">
                <h6 className="flex-1">Billed to</h6>
                <div className="flex-1">
                  <h6 className="font-semibold capitalize">{invoice.user.full_name}</h6>
                  <p>{invoice.user.email}</p>
                  <p>
                    {`${invoice.order.delivery_address.provinsi},
                     ${invoice.order.delivery_address.kecamatan}, 
                     ${invoice.order.delivery_address.kelurahan}, 
                     ${invoice.order.delivery_address.kelurahan}`}
                  </p>
                </div>
              </div>
              <Hr widthThin />

              <div className="flex">
                <h6 className="flex-1">Payment to</h6>
                <div className="flex-1">
                  <h6 className="font-semibold capitalize">Food Store</h6>
                  <p>foodstore@gmail.com</p>
                  <p>BCA</p>
                  <p>xxxx-xxxx-3939</p>
                </div>
              </div>
            </div>
          ) : (
            <h3>You don't have invoice!</h3>
          )}
        </div>
      </div>
    </Container>
  );
}
