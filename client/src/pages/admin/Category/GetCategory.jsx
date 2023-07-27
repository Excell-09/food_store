import Loading from "@/components/Loading";
import appAxiosToken from "@/utils/AppAxiosToken";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";

function CategoryItem({ category }) {
  return (
    <div className="bg-white rounded-md font-medium p-5 shadow-md flex justify-between items-center">
      <p>{category}</p>
      <div className="space-x-3">
        <Button>Update</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function GetCategory() {
  const categories = useQuery({
    queryKey: ["getCategory"],
    queryFn: async () => appAxiosToken("/api/category"),
  });

  if (categories.isLoading) {
    return (
      <section className="text-center">
        <Loading />
      </section>
    );
  }

  if (categories.data.data.length === 0) {
    return <section>0 category item</section>;
  }

  return (
    <section>
      <h6 className="text-lg mb-3">Category List</h6>
      <div className="space-y-2">
        {categories.data.data.map((item) => (
          <CategoryItem key={item._id} category={item.name} />
        ))}
      </div>
    </section>
  );
}
