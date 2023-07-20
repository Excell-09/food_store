import React from "react";
import { Card } from "antd";
import { Tag } from "antd";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import appAxiosToken from "@/utils/AppAxiosToken";

const { Meta } = Card;

export default function Cards({ products, loading }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const productsState = useSelector((state) => state.cart.products);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!user) return navigate("/login");
    dispatch(addToCart(product));
  };

  React.useEffect(() => {
    const productsData = productsState.map((item) => ({
      product: item,
      qty: item.qty,
    }));

    appAxiosToken.put("/api/cart", { items: productsData }).then(() => console.log("Cart Updated"));
  }, [productsState]);

  return loading ? (
    <CardSkeleton />
  ) : products === null ? (
    <h3 className="text-2xl col-span-3 text-center">Product Not Found!</h3>
  ) : (
    products.map((item) => (
      <React.Fragment key={item._id}>
        <Card
          cover={
            <img
              className="h-[180px] sm:h-[120px] object-cover object-center "
              alt="example"
              src={import.meta.env.VITE_BACKEND_URL + "/static/" + item.image_url}
            />
          }
          actions={[
            <BsFillCartPlusFill onClick={() => handleAddToCart(item)} className="text-3xl max-w-fit mx-auto" />,
          ]}
        >
          <Meta title={item.name} description={item.description} />
          {item.tags.map((tag) => (
            <Tag key={tag._id} color="#108ee9" className="mt-3">
              # {tag.name}
            </Tag>
          ))}
          <p className="font-semibold mt-2">Rp {item.price.toLocaleString("idr")}</p>
        </Card>
      </React.Fragment>
    ))
  );
}

export function CardSkeleton() {
  return [1, 2, 3, 4, 5, 6].map((i) => (
    <Card loading key={i}>
      <Meta title="Card title" description="This is the description" />
    </Card>
  ));
}
