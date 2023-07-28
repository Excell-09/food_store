import InputText from "@/components/Input/InputText";
import appAxiosToken from "@/utils/AppAxiosToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const tagSchema = yup.object({
  name: yup
    .string("this input must be string")
    .required("this field required")
    .min(4, "at least 4 character"),
});

export default function AddTag() {
  const { formState, register, handleSubmit, resetField } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(tagSchema),
  });
  const [displayAlert, setDisplayAlert] = React.useState(false);
  const { errors } = formState;

  const handleAddTag = (data) => appAxiosToken.post("/api/tag", data);
  const mutation = useMutation(["addTag"], handleAddTag, {
    onSuccess: () => {
      resetField("name");
    },
  });

  const handleRequestAddtag = async (data) => {
    setDisplayAlert(false);

    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      return error;
    } finally {
      setDisplayAlert(true);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleRequestAddtag)}>
        {displayAlert ? (
          mutation.isSuccess ? (
            <Alert message="Category Added!" type="success" showIcon />
          ) : (
            <Alert message="Something wrong!" type="error" showIcon />
          )
        ) : null}
        <InputText
          label={"Tag Name"}
          register={register("name")}
          type={"text"}
          errorMessage={errors?.name?.message}
        />
        <Button
          loading={mutation.isLoading}
          type="primary"
          htmlType="submit"
          className="bg-blue-500"
        >
          Add Tag
        </Button>
      </form>
    </section>
  );
}
