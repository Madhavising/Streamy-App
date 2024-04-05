import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessages: [],
  },
  reducers: {
    addMessage: (state, action) => {
     //state.messages.splice(LIVE_CHAT_COUNT, 1);
     if (state.chatMessages.length >=LIVE_CHAT_COUNT) {
      state.chatMessages.shift();
    }
      state.chatMessages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
