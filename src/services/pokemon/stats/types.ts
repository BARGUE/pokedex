export interface PokemonStats {
    id: number;
    name: string;
    stats: PokemonStatsItem[];
}

export interface PokemonStatsItem {
    name: string;
    base_stat: number;
}