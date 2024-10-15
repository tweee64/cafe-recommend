import { configureStore } from "@reduxjs/toolkit";
import cafeSlice from "./cafeSlice";

const store = configureStore({
  reducer: {
    cafes: cafeSlice,
  },
});

export default store;
