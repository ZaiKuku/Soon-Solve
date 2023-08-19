import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./reducers"; // 创建你的 rootReducer
import locationSlice from "./locationSlice";
import activeTab from "./activeTabSlice";

const store = configureStore({
  reducer: {
    openSideFilter: mySlice,
    selectedLocations: locationSlice,
    activeTab: activeTab,
  },
});

export default store;
