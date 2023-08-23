import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  roomId: null,
};

const personChatting = createSlice({
  name: "personChatting",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setRoomId,
} = personChatting.actions;

export default personChatting.reducer;
