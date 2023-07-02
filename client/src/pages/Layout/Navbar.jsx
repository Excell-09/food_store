import React from "react";
import { Select, Input } from "antd";
import appAxios from "../../utils/AppAxios";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import CartNavItem from "./CartNavItem";
import Logo from "./Logo";
import SearchNav from "./SearchNav";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/authentication/authSlice";
import { setQuery } from "@/features/query/querySlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [isOpenProfileMenu, setIsOpenProfileMenu] = React.useState(false);

  const [profileMenu] = React.useState(() => {
    if (user) {
      return [
        {
          label: "Profile",
          to: "/account",
          handleClick: () => setIsOpenProfileMenu(false),
        },
        {
          label: "Logout",
          handleClick: () => {
            dispatch(logout());
          },
          to: window.location.pathname,
        },
      ];
    }
    return [
      {
        label: "Login",
        to: "/login",
        handleClick: () => setIsOpenProfileMenu(false),
      },
      {
        label: "Register",
        to: "/register",
        handleClick: () => setIsOpenProfileMenu(false),
      },
    ];
  });

  console.log(categories);

  React.useEffect(() => {
    appAxios.get("/api/category").then(({ data }) =>
      setCategories((prevValue) => {
        const categories = data.map((category) => ({
          value: category.name,
          label: category.name,
        }));
        return [
          {
            value: "all",
            label: "all",
          },
          ...categories,
        ];
      })
    );
  }, []);

  const handleChange = (value) => dispatch(setQuery({ categories: value }));
  const handleChangeSearch = (e) => dispatch(setQuery({ q: e.target.value }));
  const handleOpenMenuProfile = () => setIsOpenProfileMenu((value) => !value);
  const handleLink = (to) => () => navigate(to);

  return (
    <header className="bg-blue-500 p-2">
      <nav className="max-w-5xl mx-auto flex max-sm:flex-wrap">
        <div className="flex items-center gap-2 flex-1 pe-2">
          <Logo handleLink={handleLink} />
          <Select className="w-[120px]" defaultValue="Category" onChange={handleChange} options={categories} />
        </div>

        <SearchNav Search={Search} onChange={handleChangeSearch} />

        <CartNavItem handleLink={handleLink} />

        <UserAvatar
          username={user?.full_name}
          handleOpenMenuProfile={handleOpenMenuProfile}
          isOpenProfileMenu={isOpenProfileMenu}
          profileMenu={profileMenu}
        />
      </nav>
    </header>
  );
}
