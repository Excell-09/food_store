import InputSelect from "@/components/Input/InputSelect";
import InputText from "@/components/Input/InputText";
import InputTextArea from "@/components/Input/InputTextArea";
import appAxiosToken from "@/utils/AppAxiosToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button } from "antd";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ImCancelCircle } from "react-icons/im";

const REQUIREDMSG = "This field is reqired";
const STRINGMSG = "the field must be string";

const productInputSchema = yup.object({
  name: yup
    .string(STRINGMSG)
    .required(REQUIREDMSG)
    .min(3, "at least 3 character"),
  description: yup
    .string(STRINGMSG)
    .required(REQUIREDMSG)
    .max(1000, "maximum character is 1000"),
  price: yup
    .number("the field must be number")
    .required(REQUIREDMSG)
    .min(3000, "minimum price 3000"),
  image_url: yup
    .mixed()
    .required(REQUIREDMSG)
    .test(
      "fileSize",
      "Image size is too large",
      (value) => value && value[0].size <= 5000000
    )
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => value && value[0].type.startsWith("image/")
    ),
  category: yup.string(STRINGMSG),
  tags: yup.string(STRINGMSG),
});

const InputImage = ({ register, errorMessage, label }) => {
  return (
    <div className="my-3 w-full">
      <label htmlFor={label} className="capitalize block">
        {label}
      </label>
      <input id={label} type="file" {...register} accept="image/*" />;
      {errorMessage && (
        <p className="text-red-500 capitalize">{errorMessage}!</p>
      )}
    </div>
  );
};

export default function AddProduct() {
  const { formState, register, handleSubmit, resetField } = useForm({
    resolver: yupResolver(productInputSchema),
  });
  const [listTags, setListTags] = React.useState([]);

  const [errorTags, setErrorTags] = React.useState(null);
  const [displayAlert, setDisplayAlert] = React.useState(false);
  const [errorCategory, setErrorCategory] = React.useState(null);

  const { errors } = formState;
  let categoryRef = useRef("choose your category,1");

  const categories = useQuery(["categories"], () =>
    appAxiosToken("/api/category").then((res) =>
      res.data.map((item) => ({ nama: item.name, id: item._id }))
    )
  );
  const tags = useQuery(["tags"], () =>
    appAxiosToken("/api/tag").then((res) => {
      return res.data.map((item) => ({ nama: item.name, id: item._id }));
    })
  );

  const mutation = useMutation({
    mutationFn: (data) =>
      appAxiosToken
        .post("/api/product", data)
        .then((res) =>
          res.data.error === 1 ? Promise.reject("something wrong") : res
        ),
    onSuccess: () => resetField(),
  });

  const handleAddProducts = async (value) => {
    setErrorCategory(null);
    setErrorTags(null);
    setDisplayAlert(false);

    if (Number(categoryRef.current.split(",")[1]) === 1) {
      setErrorCategory("this field required");
      return;
    }

    if (listTags.length === 0) {
      setErrorTags("this field required");
      return;
    }

    try {
      const formData = new FormData();

      for (let index in value) {
        if (index === "category" || index === "tags") {
          continue;
        }
        if (index === "image_url") {
          formData.append("image", value[index][0]);
          continue;
        }
        formData.append(index, value[index]);
      }

      formData.append("tags", listTags.map((tag) => tag.id).join(","));
      formData.append("category", categoryRef.current);

      await mutation.mutateAsync(formData);
    } catch (error) {
    } finally {
      setDisplayAlert(true);
    }
  };

  return (
    <section>
      {displayAlert ? (
        mutation.isSuccess ? (
          <Alert message="product Added!" type="success" showIcon />
        ) : (
          <Alert message="product Wrong!" type="error" showIcon />
        )
      ) : null}
      <form onSubmit={handleSubmit(handleAddProducts)}>
        <InputText
          register={register("name")}
          label={"product name"}
          errorMessage={errors.name?.message}
          type={"text"}
        />
        <InputText
          register={register("price")}
          label={"Price"}
          type={"number"}
          errorMessage={errors.price?.message}
        />

        <InputTextArea
          register={register("description")}
          errorMessage={errors.description?.message}
          label={"description product"}
          type={"text"}
        />

        <InputImage
          register={register("image_url")}
          label={"Image Product"}
          errorMessage={errors.image_url?.message}
        />

        <InputSelect
          register={register("category")}
          errorMessage={errorCategory || errors.category?.message}
          label={"Category"}
          options={
            categories.isFetched
              ? [{ nama: "Choose Your Category", id: 1 }, ...categories.data]
              : [{ nama: "loading...", id: 1 }]
          }
          disabled={categories.isLoading}
          eventChange={(value) => {
            setErrorCategory(null);
            categoryRef.current = value;
          }}
        />

        <InputSelect
          register={register("tags")}
          errorMessage={errors.tags?.message}
          label={"Tags"}
          options={
            tags.isFetched
              ? [{ nama: "Choose Your Tags", id: 1 }, ...tags.data]
              : [{ nama: "loading...", id: 1 }]
          }
          disabled={tags.isLoading}
          eventChange={(value) => {
            setErrorTags(null);
            if (listTags.some((tag) => tag.id === value) || value === 1) {
              return;
            }
            setListTags((prev) => [
              ...prev,
              {
                id: value,
                name: tags.data.find((tag) => tag.id === value).nama,
              },
            ]);
          }}
        />

        <p>Your List tags</p>
        <div className=" w-full min-h-12 p-3 bg-white border-[1px] border-gray-300 rounded-md flex gap-2 flex-wrap">
          {listTags.length === 0 ? (
            <p className="text-gray-500">add Your tags</p>
          ) : (
            listTags.map((value) => (
              <div className="relative" key={value.id}>
                <ImCancelCircle
                  className="text-red-500 absolute -top-3 -right-1 cursor-pointer"
                  onClick={() => {
                    setListTags((prev) =>
                      prev.filter((tag) => tag.id !== value.id)
                    );
                  }}
                />
                <span className="border-2 border-slate-400 p-2 rounded-md max-w-max">
                  {value.name}
                </span>
              </div>
            ))
          )}
        </div>
        {errorTags && <p className="text-red-500 capitalize">{errorTags}!</p>}
        <Button loading={mutation.isLoading} htmlType="submit" className="mt-3">
          Add Product
        </Button>
      </form>
    </section>
  );
}
