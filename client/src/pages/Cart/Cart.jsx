import Container from "@/components/Container";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IncrementDecrement from "./IncrementDecrement";
import { decrementProduct, incrementProduct } from "@/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import appAxiosToken from "@/utils/AppAxiosToken";
import { Button } from "antd";
import Hr from "@/components/Hr";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const productsState = useSelector((state) => state.cart.products);

  const handleDecrement = (id) => {
    if (!user) return navigate("/");
    dispatch(decrementProduct(id));
  };
  const handleIncrement = (id) => {
    if (!user) return navigate("/");
    dispatch(incrementProduct(id));
  };

  const handleCheckout = () => {
    if (productsState.length === 0) return;
    navigate("/checkout");
  };

  React.useEffect(() => {
    const productsData = productsState.map((item) => ({
      product: item,
      qty: item.qty,
    }));

    appAxiosToken.put("/api/cart", { items: productsData }).then(() => console.log("Cart Updated"));
  }, [productsState]);

  return (
    <Container>
      <div className="my-5">
        <div className="border-2 border-slate-300">
          <div className="bg-slate-200 text-slate-600 p-2 border-b-2 border-slate-300">Keranjang Belanja</div>
          <div className="p-5 text-2xl font-semibold ">Sub Total : Rp {cart.totalPrice.toLocaleString("idr")}</div>
          {cart.products.length === 0 ? (
            <h3 className="text-center py-3 font-semibold">You dont have any products in cart</h3>
          ) : (
            <>
              <div className="flex p-3">
                <span className="flex-1">Gambar</span>
                <span className="flex-1">Barang</span>
                <span className="flex-1">Harga</span>
                <span className="flex-1">QTY</span>
              </div>

              {cart.products.map((item) => (
                <React.Fragment key={item._id}>
                  <Hr />
                  <div className="flex p-3">
                    <div className="flex-1">
                      <img
                        className="w-full max-w-[50%]"
                        src={import.meta.env.VITE_BACKEND_URL + "/static/" + item.image_url}
                        alt=""
                      />
                    </div>
                    <div className="flex-1">{item.name}</div>
                    <div className="flex-1">Rp {item.totalPrice.toLocaleString("idr")}</div>
                    <div className="flex-1">
                      <IncrementDecrement
                        handleDecrement={() => handleDecrement(item._id)}
                        handleIncrement={() => handleIncrement(item._id)}
                        display={item.qty}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </div>
        <Button
          onClick={handleCheckout}
          disabled={productsState.length === 0}
          className="bg-blue-700"
          type="primary"
          block
        >
          Checkout
        </Button>
      </div>
    </Container>
  );
}
