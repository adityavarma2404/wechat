import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ChatState = {
  selectedConversationId: string | null;
};

const initialState: ChatState = {
  selectedConversationId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConversationId(state, action: PayloadAction<string>) {
      state.selectedConversationId = action.payload;
    },
  },
});

export const { setSelectedConversationId } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
