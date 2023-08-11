import { heroEmpty } from "./constants";
import type { RootState } from "../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hero, HeroesState } from "./types";

const initialState: HeroesState = {
  heroes: [],
  heroesDiff: new Map<string, string | string[]>(),
  hero: heroEmpty,
};

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<Hero[]>) => {
      state.heroes = action.payload;
    },
    setHeroesDiff: (
      state,
      action: PayloadAction<[string, string | string[]]>
    ) => {
      const [key, value] = action.payload;
      state.heroesDiff.set(key, value);
    },
    setHero: (state, action: PayloadAction<Hero>) => {
      state.hero = action.payload;
    },
  },
});

export const { setHeroes, setHeroesDiff, setHero } = heroesSlice.actions;

export const selectHeroes = (state: RootState) => state.heroes.heroes;
export const selectHeroesDiff = (state: RootState) => state.heroes.heroesDiff;
export const selectHero = (state: RootState) => state.heroes.hero;

export default heroesSlice.reducer;
