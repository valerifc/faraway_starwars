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
  heroesDiff: { [key: string]: string | string[] };
  hero: Hero;
};

export type FetchHeroesResponse = {
  count: number;
  next: string;
  previous: null | number;
  results: Hero[];
};