import { PokemonSpeciesItem } from "../pokemon/info/types";

export type PokemonListItem = {
  id: number;
  name: string;
  height: number;
  weight: number;
  images: PokemonImages;
  species: PokemonSpeciesItem;
  display_name: LocalizedText;
};

type LocalizedText = {
  en: string;
  fr: string;
};

export type PokemonImages = {
  official: string;
  shiny: string;
};

export type PokemonTypeItem = {
  key: string;
  name: { en: string; fr: string };
};

export type PokedexResponse = {
  pokemon: PokemonListItem[];
  types: PokemonTypeItem[];
};
