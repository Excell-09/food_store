import InputText from "@/components/Input/InputText";
import appAxiosToken from "@/utils/AppAxiosToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const param = useParams();

  const handleGetCategory = async () => {
    try {
      const response = await appAxiosToken.get("/api/category/");
      if (response.data.error === 1) {
        throw new Error("something wong!");
      }
      return response.data.find((value) => value._id === param.id);
    } catch (error) {
      return error;
    }
  };

  const getCategory = useQuery({
    queryKey: ["getCategories"],
    queryFn: handleGetCategory,
  });

  const [displayAlert, setDisplayAlert] = React.useState(false);
  const navigate = useNavigate();

  const updateCategory = async (data) => {
    try {
      const response = await appAxiosToken.put(
        "/api/category/" + data._id,
        data
      );
      if (response.data.error === 1) {
        throw new Error("something wrong");
      }
      navigate("/admin/category");
    } catch (error) {
      return error;
    } finally {
      setDisplayAlert(true);
    }
  };

  const { errors } = formState;
  const mutation = useMutation({
    mutationFn: updateCategory,
  });

  const handleUpdateCategory = async (data) => {
    setDisplayAlert(false);
    try {
      await mutation.mutateAsync({ ...getCategory.data, name: data.name });
      navigate("/admin/category");
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
