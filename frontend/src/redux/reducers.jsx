import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  openSideFilter: false,
};

const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setOpenSideFilter: (state, action) => {
      state.openSideFilter = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setOpenSideFilter,
} = mySlice.actions;

export default mySlice.reducer;
