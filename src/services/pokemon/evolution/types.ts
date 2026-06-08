export type PokemonEvolution = {
    evolution: PokemonEvolutionItem[];
};

export type PokemonEvolutionItem = {
    id: number;
    name: string;
    images: PokemonSprites;
    display_name?: LocalizedText;
};

export type PokemonSprites = {
    official: string;
    shiny: string;
};

export type LocalizedText = {
    en: string;
    fr: string;
};