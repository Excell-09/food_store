import Container from "@/components/Container";
import InputText from "@/components/Input/InputText";
import { Alert, Button, Checkbox, Divider } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import appAxios from "@/utils/AppAxios";
import { Link, useNavigate } from "react-router-dom";
import appAxiosToken from "@/utils/AppAxiosToken";

const schema = yup.object().shape({
  email: yup.string().email("email format is not valid!").required("email is required"),
  password: yup.string().required("password is required").min(6, "Your password is too short."),
});

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [message, setMessage] = React.useState({ type: "", message: "" });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleLogin = async (data) => {
    if (loading) setLoading(false);
    setLoading(true);
    try {
      const response = await appAxios.post("/auth/login", data);
      if (response.data.error !== 1) {
        localStorage.setItem("token", response.data.token);
        const { data } = await appAxiosToken("/api/cart");

        const cart = {
          products: data.map((item) => ({
            ...item.product,
            totalPrice: item.price,
            qty: item.qty,
          })),
          totalItem: data.map((item) => item.qty).reduce((prev, curr) => prev + curr, 0),
          totalPrice: data.map((item) => item.price).reduce((prev, curr) => prev + curr, 0),
        };
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.replace(`${window.location.origin}`);
      } else {
        setMessage({ type: "error", message: response.data.message });
      }
    } catch (error) {
      setMessage({ type: "error", message: "something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="grid min-h-[80vh]">
        <form
          className="m-auto w-full max-w-[500px] bg-white rounded-sm shadow-md p-3"
          autoComplete="off"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h3 className="text-center text-2xl font-bold">Login</h3>
          {message.message && (
            <Alert className="mt-3" message={message.message} type={message.type} showIcon closable />
          )}

          <InputText register={register("email")} label={"email"} type={"text"} errorMessage={errors.email?.message} />
          <InputText
            register={register("password")}
            label={"password"}
            type={showPassword ? "text" : "password"}
            errorMessage={errors.password?.message}
          />
          <div className="block">
            <Checkbox defaultChecked={false} onClick={handleShowPassword}>
              Show Password
            </Checkbox>
          </div>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="bg-blue-600 mt-3 me-auto block w-full"
            size={"large"}
          >
            {loading ? "loading..." : "Login"}
          </Button>
          <p className="text-slate-400 text-center mt-3">
            Do Not Have An?{" "}
            <Link className="underline text-blue-700 " to={"/register"}>
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
