import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  activeTab: "Released",
};

const activeTab = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setActiveTab,
} = activeTab.actions;

export default activeTab.reducer;
