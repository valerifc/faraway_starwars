import heroesReducer from "../features/heroes/heroesSlice";
import modalsReducer from "../features/modals/modalsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    modals: modalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
