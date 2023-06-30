import React from "react";
import { Select, Input } from "antd";
import appAxios from "../../utils/AppAxios";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import CartNavItem from "./CartNavItem";
import Logo from "./Logo";
import SearchNav from "./SearchNav";

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
      <nav className="max-w-5xl mx-auto flex max-sm:flex-wrap">
        <div className="flex items-center gap-2 flex-1 pe-2">
          <Logo handleLink={handleLink} />
          <Select className="w-[120px]" defaultValue="Category" onChange={handleChange} options={categories} />
        </div>

        <SearchNav Search={Search} onSearch={onSearch} />

        <CartNavItem handleLink={handleLink} />

        <UserAvatar
          handleOpenMenuProfile={handleOpenMenuProfile}
          isOpenProfileMenu={isOpenProfileMenu}
          profileMenu={profileMenu}
        />
      </nav>
    </header>
  );
}
