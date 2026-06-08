import { PokemonImages } from "../../pokedex/types";
import { PokemonSpeciesItem } from "../info/types";

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
