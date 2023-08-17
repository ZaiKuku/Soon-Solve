import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./reducers"; // 创建你的 rootReducer
import locationSlice from "./locationSlice";

const store = configureStore({
  reducer: {
    openSideFilter: mySlice,
    selectedLocations: locationSlice,
  },
});

export default store;
