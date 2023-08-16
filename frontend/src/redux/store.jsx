import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./reducers"; // 创建你的 rootReducer

const store = configureStore({
  reducer: {
    openSideFilter: mySlice,
  },
});

export default store;
