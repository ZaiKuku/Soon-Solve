import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  isLoadingTasks: false,
  isLoadingProfile: false,
};

const LoadingControl = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setIsLoadingTasks: (state, action) => {
      state.isLoadingTasks = action.payload;
    },
    setIsLoadingProfile: (state, action) => {
      state.isLoadingProfile = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setIsLoadingTasks,
  setIsLoadingProfile,
} = LoadingControl.actions;

export default LoadingControl.reducer;
