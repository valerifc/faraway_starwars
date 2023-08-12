import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalsState, OpenModalAttentionPayload } from "./types";
import type { RootState } from "../../app/store";

const initialState: ModalsState = {
  attention: {
    open: false,
    title: "Attention",
    context: "",
    closeBtnTitle: "It's clear",
  },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModalAttention: (
      state,
      action: PayloadAction<OpenModalAttentionPayload>
    ) => {
      state.attention = { ...state.attention, ...action.payload, open: true };
    },
    closeModalAttention: (state) => {
      state.attention = { ...state.attention, open: false };
    },
  },
});

export const { openModalAttention, closeModalAttention } = modalsSlice.actions;

export const selectModalAttention = (state: RootState) =>
  state.modals.attention;

export default modalsSlice.reducer;
