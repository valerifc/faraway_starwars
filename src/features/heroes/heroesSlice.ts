import axios from "axios";
import { swapi } from "../../constants/urls";
import { heroEmpty, fetchHeroesResponseEmpty } from "./constants";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Hero,
  HeroesState,
  FetchHeroesResponse,
  FetchHeroesThunkArg,
} from "./types";
import type { RootState } from "../../app/store";

const initialState: HeroesState = {
  heroes: fetchHeroesResponseEmpty,
  heroesDiff: {},
  hero: heroEmpty,
};

export const fetchHeroes = createAsyncThunk<
  FetchHeroesResponse,
  FetchHeroesThunkArg
>("heroes/fetchHeroes", async ({ page, search }, thunkAPI) => {
  try {
    const response = await axios.get<FetchHeroesResponse>(
      `${swapi.people}/?page=${"" + page}${search ? `&search=${search}` : ""}`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: error,
    });
  }
});

export const fetchHero = createAsyncThunk<Hero, number>(
  "heroes/fetchHero",
  async (heroId, thunkAPI) => {
    try {
      const response = await axios.get<Hero>(`${swapi.people}/${heroId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error,
      });
    }
  }
);

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<FetchHeroesResponse>) => {
      state.heroes = action.payload;
    },
    setHeroesDiff: (state, action: PayloadAction<[string, Partial<Hero>]>) => {
      const [key, value] = action.payload;
      state.heroesDiff[key] = value;
    },
    setHero: (state, action: PayloadAction<Hero>) => {
      state.hero = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHeroes.pending, () => {})
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, () => {})
      .addCase(fetchHero.pending, (state) => {
        state.hero = heroEmpty;
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.hero = action.payload;
      })
      .addCase(fetchHero.rejected, () => {});
  },
});

export const { setHeroes, setHeroesDiff, setHero } = heroesSlice.actions;

export const selectHeroes = (state: RootState) => state.heroes.heroes;
export const selectHeroesDiff = (state: RootState) => state.heroes.heroesDiff;
export const selectHero = (state: RootState) => state.heroes.hero;

export default heroesSlice.reducer;
