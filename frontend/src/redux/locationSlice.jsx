import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  selectedLocations: [],
  sex: [],
};

const locationSlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setSelectedLocations(state, action) {
      if (state.selectedLocations.includes(action.payload)) {
        state.selectedLocations = state.selectedLocations.filter(
          (location) => location !== action.payload
        );
      } else {
        state.selectedLocations.push(action.payload);
      }
    },
    setSelectedSex(state, action) {
      state.sex = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setSelectedLocations,
  setSelectedSex,
} = locationSlice.actions;

export default locationSlice.reducer;
