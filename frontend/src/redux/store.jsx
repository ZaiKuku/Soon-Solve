import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./reducers"; // 创建你的 rootReducer
import locationSlice from "./locationSlice";
import activeTab from "./activeTabSlice";
import LoadingControl from "./LoadingControl";
import personChatting from "./personChatting";

const store = configureStore({
  reducer: {
    openSideFilter: mySlice,
    selectedLocations: locationSlice,
    activeTab: activeTab,
    LoadingControl: LoadingControl,
    personChatting: personChatting,
  },
});

export default store;
