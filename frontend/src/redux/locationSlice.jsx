import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  selectedLocations: [],
  sex: "",
  friend: 0,
  title: "",
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
      if (state.sex === action.payload) {
        state.sex = "";
      } else {
        state.sex = action.payload;
      }
    },
    setSelectedFriend(state) {
      if (state.friend === 0) {
        state.friend = 1;
      } else {
        state.friend = 0;
      }
    },
    setSelectedTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setSelectedLocations,
  setSelectedSex,
  setSelectedFriend,
  setSelectedTitle,
} = locationSlice.actions;

export default locationSlice.reducer;
