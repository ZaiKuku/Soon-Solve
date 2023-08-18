import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  selectedLocations: [],
  sex: "",
  friend: 0,
  title: "",
  num: 0,
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
        state.num -= 1;
      } else {
        state.selectedLocations.push(action.payload);
        state.num += 1;
      }
    },
    setSelectedSex(state, action) {
      if (state.sex === action.payload) {
        state.sex = "";
        state.num -= 1;
      } else {
        state.sex = action.payload;
        state.num += 1;
      }
    },
    setSelectedFriend(state) {
      if (state.friend === 0) {
        state.friend = 1;
        state.num += 1;
      } else {
        state.friend = 0;
        state.num -= 1;
      }
    },
    setSelectedTitle(state, action) {
      state.title = action.payload;
      if (state.title === "") {
        state.num -= 1;
      } else {
        state.num += 1;
      }
    },

    cleanAll(state) {
      state.selectedLocations = [];
      state.sex = "";
      state.friend = 0;
      state.title = "";
    },
  },
});

export const {
  // 添加你的 reducer actions
  setSelectedLocations,
  setSelectedSex,
  setSelectedFriend,
  setSelectedTitle,
  cleanAll,
} = locationSlice.actions;

export default locationSlice.reducer;
