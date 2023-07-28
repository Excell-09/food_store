import InputText from "@/components/Input/InputText";
import appAxiosToken from "@/utils/AppAxiosToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Alert } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("name category is required")
    .min(4, "Min 4 character"),
});

export default function UpdateCategory() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const { id } = useParams();

  const handleGetCategory = (data) =>
    appAxiosToken("/api/category/").then((res) => {
      if (res.data.error === 1) {
        Promise.reject("Something wrong!");
      }
      return res.data.find((item) => item._id === data.queryKey[1]);
    });

  const getCategory = useQuery({
    queryKey: ["category", id],
    queryFn: handleGetCategory,
  });

  const [displayAlert, setDisplayAlert] = React.useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateCategory = (data) =>
    appAxiosToken.put("/api/category/" + data._id, data).then((response) => {
      if (response.data.error === 1) {
        return Promise.reject("something wrong");
      }
    });

  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["category"], { exact: true });
      navigate("/admin/category");
    },
  });

  const handleUpdateCategory = async (data) => {
    setDisplayAlert(false);
    try {
      await mutation.mutateAsync({ ...getCategory.data, name: data.name });
    } catch (error) {
      console.log(error);
    } finally {
      setDisplayAlert(true);
    }
  };

  return (
    <section>
      <h3 className="text-3xl text-center">Update Category</h3>
      {displayAlert ? (
        mutation.isSuccess ? (
          <Alert message="Category updated!" type="success" showIcon />
        ) : (
          <Alert message="Something wrong!" type="error" showIcon />
        )
      ) : null}
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <InputText
          defaultValue={getCategory.data?.name}
          label="Category Name"
          type="text"
          errorMessage={errors.name?.message}
          register={register("name")}
        />
        <Button loading={mutation.isLoading} htmlType="submit">
          Update Category
        </Button>
      </form>
    </section>
  );
}
