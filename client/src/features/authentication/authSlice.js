import appAxiosToken from "@/utils/AppAxiosToken";
import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const user = localStorage.getItem("token")
  ? jwt_decode(localStorage.getItem("token"))
  : false;

const initialState = {
  user: user || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const logout = () => async () => {
  try {
    const response = await appAxiosToken.post("/auth/logout");
    if (response.data.error !== 1) {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      window.location.reload();
    }
  } catch (error) {
    return error;
  }
};

// Action creators are generated for each case reducer function

export default authSlice.reducer;
