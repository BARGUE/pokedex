export interface PokemonAbilities {
  abilities: PokemonAbilityItem[];
}

export interface PokemonAbilityItem {
  key: string;
  isHidden: boolean;
  flavorText: Partial<Record<PokemonAbilityLanguage, string>>;
  localized?: Partial<Record<PokemonAbilityLanguage, PokemonAbilityLocalizedEntry>>;
}

export type PokemonAbilityLanguage = "en" | "fr";

export interface PokemonAbilityLocalizedEntry {
  name: string;
  effect: { short: string; long: string };
}