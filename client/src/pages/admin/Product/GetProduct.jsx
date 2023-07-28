import appAxiosToken from "@/utils/AppAxiosToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button, Pagination, Table, Tag } from "antd";
import Loading from "@/components/Loading";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => <p>Rp {text.toLocaleString("idr")}</p>,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (src) => <img className="w-28" src={src} />,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) =>
      tags.map((tag, i) => (
        <Tag key={i} color={i % 2 ? "blue" : "red"} className="capitalize">
          {tag}
        </Tag>
      )),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (productId) => {
      const handleDelete = async () => {
        try {
          const res = await appAxiosToken.delete("/api/product/" + productId);
          if (res.data.error === 1) {
            throw new Error("someting wrong");
          }
          window.location.reload();
        } catch (error) {
          return error;
        }
      };
      return (
        <div>
          <Button
            className="focus:opacity-40"
            onClick={handleDelete}
            type="primary"
            danger
          >
            Remove Product
          </Button>
        </div>
      );
    },
  },
];

export default function GetProduct() {
  const [currentState, sestCurrentState] = React.useState(1);
  const formatData = (response) => ({
    ...response.data,
    data: response.data.data.map((item) => ({
      key: item._id,
      name: item.name,
      price: item.price,
      image: import.meta.env.VITE_BACKEND_URL + "/static/" + item.image_url,
      tags: item.tags.map((item) => item.name),
      category: item.category.name,
      action: item._id,
    })),
  });

  const products = useQuery(["products", currentState], ({ queryKey }) =>
    appAxiosToken("/api/product?skip=" + (queryKey[1] - 1) * 10).then((res) =>
      formatData(res)
    )
  );

  const queryClient = useQueryClient();

  const handleNext = async (value) => {
    sestCurrentState(() => value);
    queryClient.invalidateQueries(["products", currentState]);
  };

  return (
    <section>
      {products.isFetching ? (
        <Loading />
      ) : (
        <>
          <Table
            pagination={false}
            columns={columns}
            dataSource={products.data.data}
          />
          <Pagination
            className="mt-5"
            defaultPageSize={10}
            current={currentState}
            total={products.data.count}
            onChange={handleNext}
          />
        </>
      )}
    </section>
  );
}
