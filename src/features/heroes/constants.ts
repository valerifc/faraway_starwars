import { Hero, FetchHeroesResponse } from "./types";

export const heroEmpty: Hero = {
  name: "",
  height: "",
  mass: "",
  hair_color: "",
  skin_color: "",
  eye_color: "",
  birth_year: "",
  gender: "",
  homeworld: "",
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: "",
  edited: "",
  url: "",
};

export const fetchHeroesResponseEmpty: FetchHeroesResponse = {
  count: 0,
  next: "",
  previous: null,
  results: [],
};
