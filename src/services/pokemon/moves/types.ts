export type PokemonMoves = {
    moves: PokemonMove[];
};

export type PokemonMove = {
    key: string;
    stats: PokemonMoveStats;
    availability: PokemonMoveAvailability;
    localized: {
        en: PokemonMoveLocalized;
        fr: PokemonMoveLocalized;
    };
};

export type PokemonMoveStats = {
    type: string;
    damageClass: string;
    power: number;
    accuracy: number;
    pp: number;
    priority: number;
};

export type PokemonMoveAvailability = {
    versions: string[];
};

export type PokemonMoveLocalized = {
    name: string;
    effect: {
        short: string;
        long: string;
    };
    flavorEntries: PokemonMoveFlavorTextEntry[];
};

export type PokemonMoveFlavorTextEntry = {
    flavor_text: string;
    version_group: {
        name: string;
        url: string;
    };
};