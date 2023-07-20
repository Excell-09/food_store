import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { clearProducts } from "@/features/cart/cartSlice";
import appAxiosToken from "@/utils/AppAxiosToken";
import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Addresses = React.lazy(() => import("./Addresses"));
const Orders = React.lazy(() => import("./Orders"));

export default function Checkout() {
  const deliveryCost = 20_000;
  const [carts, setCarts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [addresses, setAddresses] = React.useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currentAddress = addresses[0]?._id;

  React.useEffect(() => {
    appAxiosToken("/api/delivery-address").then(({ data }) => setAddresses(data.data));
    appAxiosToken("/api/cart").then(({ data }) => setCarts(data));
  }, []);

  const handleOrder = async () => {
    if (carts.length === 0) {
      navigate("/");
      return;
    }

    if (loading) setLoading(false);
    setLoading(true);

    try {
      const res = await appAxiosToken.post("/api/order", {
        delivery_fee: deliveryCost,
        delivery_address: currentAddress,
      });

      if (res.data.error !== 1) {
        localStorage.removeItem("cart");
        dispatch(clearProducts());
        await appAxiosToken.put("/api/cart", { items: [] });
        navigate("/invoices/" + res.data._id);
      }
    } catch (error) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="mt-5 border-2  border-slate-300">
        <div className="bg-slate-200 text-slate-600 p-2 border-b-2 border-slate-300">Checkout</div>
        <div className="p-3">
          <div>
            <h3 className="text-2xl">Pilih Alamat</h3>
            <React.Suspense fallback={<Loading />}>
              <Addresses
                currentValue={currentAddress}
                addresses={addresses}
                onChange={(value) => (currentAddress = value)}
              />
            </React.Suspense>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl">Konfimasi Pesanan</h3>
            <React.Suspense fallback={<Loading />}>
              <Orders items={carts} deliveryCost={deliveryCost} />
            </React.Suspense>
          </div>
        </div>
        <Button loading={loading} onClick={handleOrder} className="bg-blue-700" type="primary" block>
          Bayar
        </Button>
      </div>
    </Container>
  );
}
