export type ModalsState = {
  attention: AttentionModalState;
};

export type AttentionModalState = {
  open: boolean;
  title: string;
  context: string;
  closeBtnTitle: string;
};

export type OpenModalAttentionPayload = Partial<
  Omit<AttentionModalState, "open">
>;
