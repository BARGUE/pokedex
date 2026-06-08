export type PokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    images: PokemonSprites;
    species: PokemonSpeciesItem;
    display_name: LocalizedText,
}

export interface PokemonSprites {
    official: string | null;
    shiny: string | null;
}

export type PokemonSpeciesItem = {
    key: string;
    classification: SpeciesClassification;
    types: PokemonTypeItem[];
    flags: SpeciesFlags;
    localized: {
        en: SpeciesLocalized;
        fr: SpeciesLocalized;
    };
};

type LocalizedText = {
    en: string;
    fr: string;
};

export type SpeciesClassification = {
    generationKey: string;
    habitatKey: string;
    shapeKey: string;
};

export type PokemonTypeItem = {
    key: string;
    name: LocalizedText;
};

export type SpeciesFlags = {
    isLegendary: boolean;
    isMythical: boolean;
};

export type SpeciesLocalized = {
    name: string;
    genus: string;
    flavor: string;
};