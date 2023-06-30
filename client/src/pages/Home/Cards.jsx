import React from "react";
import { Card } from "antd";
import { Tag } from "antd";
import { BsFillCartPlusFill } from "react-icons/bs";

const { Meta } = Card;

export default function Cards({ products }) {
  return products.map((item) => (
    <React.Fragment key={item._id}>
      <Card
        cover={
          <img
            className="h-[180px] sm:h-[120px] object-cover object-center "
            alt="example"
            src={import.meta.env.VITE_BACKEND_URL + "/static/" + item.image_url}
          />
        }
        actions={[<BsFillCartPlusFill className="text-3xl max-w-fit mx-auto" />]}
      >
        <Meta title={item.name} description={item.description} />
        <Tag color="#108ee9" className="mt-3">
          # {item.tags.name}
        </Tag>
      </Card>
    </React.Fragment>
  ));
}

export function CardSkeleton() {
  return [1, 2, 3, 4, 5, 6].map(() => (
    <Card loading>
      <Meta title="Card title" description="This is the description" />
    </Card>
  ));
}
