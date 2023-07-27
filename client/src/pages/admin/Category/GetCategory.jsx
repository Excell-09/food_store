import Loading from "@/components/Loading";
import appAxiosToken from "@/utils/AppAxiosToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryItem({ category }) {

  const handleDelete = async (categoryId) => {
    try {
      const response = await appAxiosToken.delete(
        "/api/category/" + categoryId
      );
      if (response.data.error === 1) {
        throw new Error("something wong!");
      }
    } catch (error) {
      return error;
    }
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => queryClient.invalidateQueries(["getCategory"]),
  });

  return (
    <div className="bg-white rounded-md font-medium p-5 shadow-md flex justify-between items-center">
      <p>{category.name}</p>
      <div className="space-x-3">
        <Button
          onClick={() => navigate("/admin/category/update/" + category._id)}
        >
          Update
        </Button>
        <Button
          loading={mutation.isLoading}
          onClick={() => mutation.mutate(category._id)}
          type="primary"
          danger
        >
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
          <CategoryItem key={item._id} category={item} />
        ))}
      </div>
    </section>
  );
}
