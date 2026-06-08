/** Types pour un type Pokémon (relations de dégâts, faiblesses). */

import { PokemonListItem } from "../list/types";

export type TypeDamageRelations = {
  double_damage_from: string[];
  half_damage_from: string[];
  no_damage_from: string[];
  double_damage_to?: string[];
  half_damage_to?: string[];
  no_damage_to?: string[];
};

export type TypeDamageResponse = {
  name: string;
  damage_relations: TypeDamageRelations;
};

export type TypeWithDamageRelations = {
  damageRelations?: {
    from?: { double?: string[]; half?: string[]; none?: string[] };
  };
  damage_relations?: TypeDamageRelations;
};

export type WeaknessResult = {
  weak: Array<{ type: string; multiplier: number }>;
  resist: Array<{ type: string; multiplier: number }>;
  immune: string[];
};

export function getPokemonTypeKeys(pokemon: PokemonListItem): string[] {
  return pokemon.species?.types?.map((t) => t.key) ?? [];
}
