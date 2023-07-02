import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: "",
  categories: "",
};

export const authSlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      if (action.payload.categories) {
        state.categories = action.payload.categories;
      } else {
        state.q = action.payload.q;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuery } = authSlice.actions;

export default authSlice.reducer;
