import React from "react";
import { Select, Input, Avatar, Button } from "antd";
import appAxios from "../../utils/AppAxios";
import { BsCart2 } from "react-icons/bs";
import MenuItem from "./MeneItem";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = false;
  const { Search } = Input;
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [isOpenProfileMenu, setIsOpenProfileMenu] = React.useState(false);
  const [profileMenu] = React.useState(() => {
    if (user) {
      return [
        {
          label: "Profile",
          to: "/account",
        },
        {
          label: "Logout",
          to: "/",
        },
      ];
    }
    return [
      {
        label: "Login",
        to: "/login",
      },
      {
        label: "Register",
        to: "/register",
      },
    ];
  });

  React.useEffect(() => {
    appAxios.get("/api/category").then(({ data }) =>
      setCategories(() => {
        const categories = data.map((category) => ({
          value: category.name,
          label: category.name,
        }));
        return categories;
      })
    );
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => console.log(value);
  const handleOpenMenuProfile = () => setIsOpenProfileMenu((value) => !value);
  const handleLink = (to) => () => navigate(to);

  return (
    <header className="bg-blue-500 p-2">
      <div className="max-w-5xl mx-auto flex max-sm:flex-wrap">
        <div className="flex items-center gap-2 flex-1 pe-2">
          <h6 onClick={handleLink("/")} className="text-2xl text-white cursor-pointer">
            POST
          </h6>
          <Select className="w-[120px]" defaultValue="Category" onChange={handleChange} options={categories} />
        </div>

        <div className="w-full mt-3 sm:mt-0 max-sm:order-last sm:order-0 sm:max-w-2xl">
          <Search placeholder="Search Food" onSearch={onSearch} enterButton />
        </div>

        <div className="relative px-3" onClick={handleLink("/checkout")}>
          <small className="absolute bg-red-500 w-5 text-center text-white rounded-full right-1 -top-1">0</small>
          <BsCart2 className="text-white text-3xl cursor-pointer" />
        </div>

        <div className="relative">
          <Avatar className="cursor-pointer" onClick={handleOpenMenuProfile}>
            U
          </Avatar>
          <div
            className={`absolute bg-white p-1 right-0 mt-1 rounded-md shadow transition-all duration-200 ${
              isOpenProfileMenu
                ? "opacity-100 scale-100 translate-y-0 translate-x-0"
                : "opacity-0 scale-0 -translate-y-12 translate-x-10"
            }`}
          >
            <MenuItem item={profileMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}
