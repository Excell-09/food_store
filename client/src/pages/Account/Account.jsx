import Hr from "@/components/Hr";
import React from "react";
import { useSelector } from "react-redux";

export default function Account() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="my-3 text-center font-semibold">My Profile</div>
      <div className="p-2">
        <Hr/>
        <div>
          <div className="flex my-3">
            <p className="flex-1">Name</p>
            <p className="flex-1 capitalize">{user.full_name}</p>
          </div>

          <Hr/>
          <div className="flex my-3">
            <p className="flex-1">Email</p>
            <p className="flex-1">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
