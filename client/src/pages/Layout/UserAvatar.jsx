import { Avatar } from "antd";
import React from "react";
import { CgProfile } from "react-icons/cg";
import MenuItem from "./MeneItem";

export default function UserAvatar({ handleOpenMenuProfile, profileMenu, isOpenProfileMenu, username }) {
  return (
    <div className="relative">
      <Avatar
        className="cursor-pointer text-lg capitalize"
        onClick={handleOpenMenuProfile}
        icon={username ? "" : <CgProfile className="text-3xl" />}
      >
        {username?.[0]}
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
  );
}
