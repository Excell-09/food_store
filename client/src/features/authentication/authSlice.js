import appAxiosToken from "@/utils/AppAxiosToken";
import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const user = localStorage.getItem("token") ? jwt_decode(localStorage.getItem("token")) : false;

const initialState = {
  user: user || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: async (state) => {
      try {
        const response = await appAxiosToken.post("/auth/logout");
        if (response.data.error !== 1) {
          localStorage.removeItem("token");
          localStorage.removeItem("cart");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
