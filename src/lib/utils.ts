import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EncounterLevelRange } from "@/src/services/pokemon/encounters/types";
import { PokemonDetail } from "@/src/services/pokemon/info/types";
import { PokemonListItem } from "@/src/services/pokemon/list/types";
import { getType } from "@/src/services/pokemon/type/api";
import { TypeWithDamageRelations } from "@/src/services/pokemon/type/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPokemonImage(
  pokemon: PokemonDetail | PokemonListItem,
  shiny = false
): string {
  const official = pokemon?.images?.official ?? "";
  const shinyUrl = pokemon?.images?.shiny ?? "";

  if (shiny) return shinyUrl || official || "/images/mark-unknown.png";
  return official || "/images/mark-unknown.png";
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

export function formatVersionName(name: string): string {
  const versionNames: Record<string, string> = {
    'red': 'Rouge', 'blue': 'Bleu', 'yellow': 'Jaune',
    'gold': 'Or', 'silver': 'Argent', 'crystal': 'Cristal',
    'ruby': 'Rubis', 'sapphire': 'Saphir', 'emerald': 'Émeraude',
    'firered': 'Rouge Feu', 'leafgreen': 'Vert Feuille',
    'diamond': 'Diamant', 'pearl': 'Perle', 'platinum': 'Platine',
    'heartgold': 'Or HeartGold', 'soulsilver': 'Argent SoulSilver',
    'black': 'Noir', 'white': 'Blanc', 'black-2': 'Noir 2', 'white-2': 'Blanc 2',
    'x': 'X', 'y': 'Y', 'omega-ruby': 'Rubis Oméga', 'alpha-sapphire': 'Saphir Alpha',
    'sun': 'Soleil', 'moon': 'Lune', 'ultra-sun': 'Ultra-Soleil', 'ultra-moon': 'Ultra-Lune',
    'sword': 'Épée', 'shield': 'Bouclier',
    'scarlet': 'Écarlate', 'violet': 'Violet',
    'green-japan': 'Vert (Japon)', 'red-japan': 'Rouge (Japon)',
    'lets-go-pikachu': 'Let\'s Go Pikachu', 'lets-go-eevee': 'Let\'s Go Évoli',
  };
  return versionNames[name] || name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}

/** Formate une clé de zone (ex. "kanto-route-24-area") en libellé lisible. */
export function formatLocationAreaKey(key: string): string {
  return key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/** Formate les plages de niveau pour l’affichage (ex. "Niv. 3-5" ou "Niv. 7"). */
export function formatLevelRanges(levelRanges: EncounterLevelRange[]): string {
  if (!levelRanges?.length) return '';
  return levelRanges
    .map((r) => (r.min === r.max ? `Niv. ${r.min}` : `Niv. ${r.min}-${r.max}`))
    .join(', ');
}

export function getMoveCategory(damageClass: string): { label: string; color: string } {
  switch (damageClass) {
    case 'physical':
      return { label: 'Physique', color: 'bg-orange-500' };
    case 'special':
      return { label: 'Spécial', color: 'bg-indigo-500' };
    case 'status':
      return { label: 'Statut', color: 'bg-gray-500' };
    default:
      return { label: damageClass, color: 'bg-gray-500' };
  }
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-pokemon-normal',
    fire: 'bg-pokemon-fire',
    water: 'bg-pokemon-water',
    electric: 'bg-pokemon-electric',
    grass: 'bg-pokemon-grass',
    ice: 'bg-pokemon-ice',
    fighting: 'bg-pokemon-fighting',
    poison: 'bg-pokemon-poison',
    ground: 'bg-pokemon-ground',
    flying: 'bg-pokemon-flying',
    psychic: 'bg-pokemon-psychic',
    bug: 'bg-pokemon-bug',
    rock: 'bg-pokemon-rock',
    ghost: 'bg-pokemon-ghost',
    dragon: 'bg-pokemon-dragon',
    dark: 'bg-pokemon-dark',
    steel: 'bg-pokemon-steel',
    fairy: 'bg-pokemon-fairy',
  };
  return colors[type] || 'bg-[#252b37]';
}

// Filter Mega Pokemon by name pattern: -mega, -mega-x, -mega-y
export function filterMegaPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  return pokemonList.filter(p =>
    p.name.includes('-mega-x') ||
    p.name.includes('-mega-y') ||
    p.name.endsWith('-mega')
  );
}

// Filter Gigantamax Pokemon
export function filterGigantamaxPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  return pokemonList.filter(p => p.name.includes('-gmax'));
}

// Filter Alola forms
export function filterAlolaPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  return pokemonList.filter(p => p.name.includes('-alola'));
}

// Filter Galar forms
export function filterGalarPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  return pokemonList.filter(p => p.name.includes('-galar'));
}

// Filter Hisui forms
export function filterHisuiPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  return pokemonList.filter(p => p.name.includes('-hisui'));
}

// Filter Paldea forms
export function filterPaldeaPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  return pokemonList.filter(p => p.name.includes('-paldea'));
}

// Filter Starter Pokemon (hardcoded list)
export function filterStarterPokemon(pokemonList: PokemonListItem[]): PokemonListItem[] {
  const starterNames = [
    'bulbasaur', 'charmander', 'squirtle',
    'chikorita', 'cyndaquil', 'totodile',
    'treecko', 'torchic', 'mudkip',
    'turtwig', 'chimchar', 'piplup',
    'snivy', 'tepig', 'oshawott',
    'chespin', 'fennekin', 'froakie',
    'rowlet', 'litten', 'popplio',
    'grookey', 'scorbunny', 'sobble',
    'sprigatito', 'fuecoco', 'quaxly'
  ];
  return pokemonList.filter(p => starterNames.includes(p.name));
}

// Filter Legendary Pokemon
export function filterLegendaryPokemon(
  pokemonList: PokemonListItem[]
): PokemonListItem[] {
  return pokemonList.filter(
    (pokemon) => pokemon.species?.flags?.isLegendary === true
  );
}

// Filter Mythical Pokemon
export function filterMythicalPokemon(
  pokemonList: PokemonListItem[]
): PokemonListItem[] {
  return pokemonList.filter(
    (pokemon) => pokemon.species?.flags?.isMythical === true
  );
}

export async function calculateWeaknesses(types: string[]) {
  if (types.length === 0) {
    return { weak: [], resist: [], immune: [] as string[] };
  }
  const typeDatasArrays = await Promise.all(types.map(getType));
  const typeDatas = typeDatasArrays.flat() as TypeWithDamageRelations[];
  const mult = new Map<string, number>();

  const apply = (arr: string[], factor: number) => {
    for (const atk of arr) {
      const prev = mult.get(atk) ?? 1;
      mult.set(atk, prev * factor);
    }
  };

  for (const t of typeDatas) {
    const from = t.damageRelations?.from;
    const double = (from?.double ?? t.damage_relations?.double_damage_from) ?? [];
    const half = (from?.half ?? t.damage_relations?.half_damage_from) ?? [];
    const none = (from?.none ?? t.damage_relations?.no_damage_from) ?? [];
    apply(double, 2);
    apply(half, 0.5);
    apply(none, 0);
  }

  const weak: Array<{ type: string; multiplier: number }> = [];
  const resist: Array<{ type: string; multiplier: number }> = [];
  const immune: string[] = [];

  for (const [atk, m] of mult.entries()) {
    if (m === 0) immune.push(atk);
    else if (m > 1) weak.push({ type: atk, multiplier: m });
    else if (m < 1) resist.push({ type: atk, multiplier: m });
  }

  weak.sort((a, b) => b.multiplier - a.multiplier || a.type.localeCompare(b.type));
  resist.sort((a, b) => a.multiplier - b.multiplier || a.type.localeCompare(b.type));
  immune.sort((a, b) => a.localeCompare(b));

  return { weak, resist, immune };
}