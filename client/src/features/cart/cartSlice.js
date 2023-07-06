import { createSlice } from "@reduxjs/toolkit";

const cartCurrent = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : false;

const initialState = {
  products: cartCurrent.products || [],
  totalItem: cartCurrent.totalItem || 0,
  totalPrice: cartCurrent.totalPrice || 0,
};

export const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = { ...action.payload, qty: 1, totalPrice: action.payload.price };
      const exitsItem = state.products.find((item) => item._id === newItem._id);

      if (exitsItem) {
        const index = state.products.findIndex((item) => item._id === newItem._id);
        state.totalItem += 1;
        state.totalPrice += newItem.qty * newItem.price;
        state.products[index].totalPrice += newItem.qty * newItem.price;
        state.products[index].qty += 1;
        return;
      }

      state.products.push(newItem);
      state.totalItem += 1;
      state.totalPrice += newItem.price;

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state));
    },
    incrementProduct: (state, action) => {
      const currentProductIndex = state.products.findIndex((item) => item._id === action.payload);

      state.products[currentProductIndex].totalPrice += state.products[currentProductIndex].price;
      state.products[currentProductIndex].qty += 1;

      state.totalItem += 1;
      state.totalPrice += state.products[currentProductIndex].price;

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementProduct: (state, action) => {
      const currentProductIndex = state.products.findIndex((item) => item._id === action.payload);
      const currentProductIndexCopy = { ...state.products[currentProductIndex] };

      if (state.products[currentProductIndex].qty <= 1) {
        state.products.splice(currentProductIndex, 1);
      } else {
        state.products[currentProductIndex].totalPrice -= state.products[currentProductIndex].price;
        state.products[currentProductIndex].qty -= 1;
      }

      state.totalItem -= 1;
      state.totalPrice -= currentProductIndexCopy.price;

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearProducts: (state) => {
      state.products = [];
      state.totalItem = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, incrementProduct, decrementProduct, clearProducts } = authSlice.actions;

export default authSlice.reducer;
