import InputText from "@/components/Input/InputText";
import appAxiosToken from "@/utils/AppAxiosToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Alert } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("name category is required")
    .min(4, "Min 4 character"),
});

export default function AddCategory() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { name: "" },
    resolver: yupResolver(schema),
  });
  const [displayAlert, setDisplayAlert] = React.useState(false);

  const postCategory = (data) => {
    return appAxiosToken.post("/api/category", data).then((res) => {
      if (res.data.error === 1) Promise.reject("Something wrong");
    });
  };

  const { errors } = formState;
  const mutation = useMutation({
    mutationFn: postCategory,
  });

  const handleAddCategory = async (data) => {
    setDisplayAlert(false);
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    } finally {
      setDisplayAlert(true);
    }
  };

  return (
    <section>
      <h3 className="text-3xl text-center">Add Category</h3>
      {displayAlert ? (
        mutation.isSuccess ? (
          <Alert message="Category Added!" type="success" showIcon />
        ) : (
          <Alert message="Something wrong!" type="error" showIcon />
        )
      ) : null}
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <InputText
          label="Category Name"
          type="text"
          errorMessage={errors.name?.message}
          register={register("name")}
        />
        <Button loading={mutation.isLoading} htmlType="submit">
          Add Category
        </Button>
      </form>
    </section>
  );
}
