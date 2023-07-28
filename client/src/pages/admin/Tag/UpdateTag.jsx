import InputText from "@/components/Input/InputText";
import appAxiosToken from "@/utils/AppAxiosToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { tagSchema } from "./AddTag";

export default function UpdateTag() {
  const params = useParams();
  const currentTag = useQuery(["tag", params.id], {
    queryFn: (data) => {
      return appAxiosToken("/api/tag").then((res) => {
        if (res.data.error === 1) {
          return Promise.reject("something wrong");
        }
        return res.data.find((item) => item._id === data.queryKey[1]);
      });
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(tagSchema),
  });
  const { errors } = formState;

  const mutation = useMutation({
    mutationFn: (data) =>
      appAxiosToken.put("/api/tag/" + data._id, data).then((res) => {
        if (res.data.error === 1) {
          return Promise.reject("something wrong!");
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tag"], { exact: true });
      navigate("/admin/tag");
    },
  });

  const handleUpdate = async ({ name }) => {
    await mutation.mutateAsync({ ...currentTag.data, name });
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <InputText
          defaultValue={currentTag.data?.name}
          register={register("name")}
          errorMessage={errors.name?.message}
          label={"tag name"}
          type={"text"}
        />
        <Button
          loading={mutation.isLoading}
          type="primary"
          className="bg-blue-500"
          htmlType="submit"
        >
          Update tag
        </Button>
      </form>
    </section>
  );
}
