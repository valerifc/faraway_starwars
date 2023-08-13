export type Hero = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type HeroesState = {
  heroes: FetchHeroesResponse;
  heroesDiff: { [heroId: string]: Partial<Hero> };
  hero: Hero;
};

export type FetchHeroesResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Hero[];
};

export type FetchHeroesThunkArg = { page: number; search: string | null };