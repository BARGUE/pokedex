import type { Language } from '@/src/contexts/LanguageContext';

// Static UI translations
export const translations = {
  // Common
  pokedex: { fr: 'Pokédex', en: 'Pokédex' },
  home: { fr: 'Accueil', en: 'Home' },
  explore: { fr: 'Explorer', en: 'Explore' },
  open: { fr: 'Ouvrir', en: 'Open' },
  close: { fr: 'Fermer', en: 'Close' },
  loading: { fr: 'Chargement...', en: 'Loading...' },
  loadingPokemon: { fr: 'Chargement des Pokémon...', en: 'Loading Pokémon...' },
  dataVia: { fr: 'Données via', en: 'Data from' },
  previous: { fr: 'Précédent', en: 'Previous' },
  next: { fr: 'Suivant', en: 'Next' },
  page: { fr: 'Page', en: 'Page' },
  on: { fr: 'sur', en: 'of' },
  seeAll: { fr: 'Voir tout', en: 'See all' },

  // Index page
  heroTitle1: { fr: 'Attrapez', en: 'Gotta' },
  heroTitle2: { fr: 'les Tous', en: 'Catch \'Em All' },
  heroSubtitle: { fr: "L'encyclopédie ultime des Pokémon. Découvrez, explorez et maîtrisez l'univers Pokémon.", en: "The ultimate Pokémon encyclopedia. Discover, explore and master the Pokémon universe." },
  pokemonAvailable: { fr: 'Pokémon disponibles', en: 'Pokémon available' },
  explorePokedex: { fr: 'Explorer le Pokédex', en: 'Explore Pokédex' },
  comparator: { fr: 'Comparateur', en: 'Compare' },
  quiz: { fr: 'Quiz', en: 'Quiz' },
  itemsAndBerries: { fr: 'Objets & Baies', en: 'Items & Berries' },
  exploreByCategory: { fr: 'Explorez par catégorie', en: 'Explore by category' },
  exploreByCategorySubtitle: { fr: 'Découvrez les différentes formes et évolutions spéciales', en: 'Discover different forms and special evolutions' },
  mega: { fr: 'Méga', en: 'Mega' },
  gigamax: { fr: 'Gigamax', en: 'Gigantamax' },
  regional: { fr: 'Régionaux', en: 'Regional' },

  // Categories
  pokemon: { fr: 'Pokémon', en: 'Pokémon' },
  starters: { fr: 'Compagnons de début', en: 'Starters' },
  startersSubtitle: { fr: 'Le début de toute aventure', en: 'Starter companions' },
  mythical: { fr: 'Pokémon Mythiques', en: 'Mythical Pokémon' },
  mythicalSubtitle: { fr: 'Créatures rares et sacrées', en: 'Rare and sacred creatures' },
  legendary: { fr: 'Légendaires', en: 'Legendaries' },
  legendarySubtitle: { fr: 'Forces qui façonnent le monde', en: 'Forces that shape the world' },
  megaEvolutions: { fr: 'Méga-Évolutions', en: 'Mega Evolutions' },
  megaSubtitle: { fr: 'Puissance libérée', en: 'Released power' },
  gigamaxEvolutions: { fr: 'Gigamax-Évolutions', en: 'Gigamax Evolutions' },
  gigamaxSubtitle: { fr: 'Des titans hors normes', en: 'Titans out of the norm' },
  forms: { fr: 'formes', en: 'forms' },
  alolaForms: { fr: 'Formes Alola', en: 'Alola Forms' },
  alolaSubtitle: { fr: 'Variantes tropicales', en: 'Tropical variants' },
  galarForms: { fr: 'Formes Galar', en: 'Galar Forms' },
  galarSubtitle: { fr: 'Variantes britanniques', en: 'British variants' },
  hisuiForms: { fr: 'Formes Hisui', en: 'Hisui Forms' },
  hisuiSubtitle: { fr: 'Variantes anciennes', en: 'Ancient variants' },

  // Games
  allGamesByGeneration: { fr: 'Tous les jeux par génération', en: 'All games by generation' },
  games: { fr: 'Jeux', en: 'Games' },
  generations: { fr: 'Générations', en: 'Generations' },
  beginning: { fr: 'Début', en: 'Beginning' },
  consoles: { fr: 'Consoles', en: 'Consoles' },
  navigateBetweenGenerations: { fr: 'Naviguez entre les générations avec les flèches', en: 'Navigate between generations with the arrows' },

  // Pokedex
  nationalPokedex: { fr: 'Pokédex National', en: 'National Pokédex' },
  exploreAllPokemon: { fr: 'Explorez tous les Pokémon de toutes les générations', en: 'Explore all Pokémon from every generation' },
  searchPokemon: { fr: 'Rechercher un Pokémon...', en: 'Search a Pokémon...' },
  allGenerations: { fr: 'Toutes', en: 'All' },
  region: { fr: 'Région', en: 'Region' },
  types: { fr: 'Types', en: 'Types' },
  shiny: { fr: 'Shiny', en: 'Shiny' },
  filterByType: { fr: 'Filtrer par type', en: 'Filter by type' },
  clear: { fr: 'Effacer', en: 'Clear' },
  results: { fr: 'résultats', en: 'results' },
  display: { fr: 'Affichage', en: 'Showing' },
  noPokemonFound: { fr: 'Aucun Pokémon trouvé', en: 'No Pokémon found' },

  // Pokemon Detail
  height: { fr: 'Taille', en: 'Height' },
  weight: { fr: 'Poids', en: 'Weight' },
  abilities: { fr: 'Talents', en: 'Abilities' },
  clickForDetails: { fr: 'cliquez pour détails', en: 'click for details' },
  hidden: { fr: 'caché', en: 'hidden' },
  baseStats: { fr: 'Statistiques de base', en: 'Base Stats' },
  total: { fr: 'Total', en: 'Total' },
  stats: { fr: 'Stats', en: 'Stats' },
  weaknesses: { fr: 'Faiblesses', en: 'Weaknesses' },
  attacks: { fr: 'Attaques', en: 'Moves' },
  locations: { fr: 'Lieux', en: 'Locations' },
  evolution: { fr: 'Évolution', en: 'Evolution' },
  weaknessesAndResistances: { fr: 'Faiblesses et Résistances', en: 'Weaknesses & Resistances' },
  learnedMoves: { fr: 'Attaques apprises', en: 'Learned Moves' },
  locationsTitle: { fr: 'Localisations', en: 'Locations' },
  evolutionChain: { fr: "Chaîne d'évolution", en: 'Evolution Chain' },
  loadingEvolutions: { fr: 'Chargement des évolutions...', en: 'Loading evolutions...' },
  hiddenAbility: { fr: 'Talent caché', en: 'Hidden Ability' },

  // Stat names
  hp: { fr: 'PV', en: 'HP' },
  attack: { fr: 'Attaque', en: 'Attack' },
  defense: { fr: 'Défense', en: 'Defense' },
  specialAttack: { fr: 'Atq. Spé', en: 'Sp. Atk' },
  specialDefense: { fr: 'Déf. Spé', en: 'Sp. Def' },
  speed: { fr: 'Vitesse', en: 'Speed' },

  // Weakness chart
  weaknessesLabel: { fr: 'Faiblesses', en: 'Weaknesses' },
  resistances: { fr: 'Résistances', en: 'Resistances' },
  immunities: { fr: 'Immunités', en: 'Immunities' },
  errorLoadingWeaknesses: { fr: 'Erreur lors du chargement des faiblesses', en: 'Error loading weaknesses' },
  noWeaknessOrResistance: { fr: 'Aucune faiblesse ou résistance particulière', en: 'No particular weakness or resistance' },

  // Moves
  searchMove: { fr: 'Rechercher une attaque...', en: 'Search a move...' },
  movesFound: { fr: 'attaque(s) trouvée(s)', en: 'move(s) found' },
  noMoveFound: { fr: 'Aucune attaque trouvée', en: 'No move found' },
  allMethods: { fr: 'Toutes', en: 'All' },
  levelUp: { fr: 'Par niveau', en: 'Level up' },
  machine: { fr: 'CT/CS', en: 'TM/HM' },
  egg: { fr: 'Œuf', en: 'Egg' },
  tutor: { fr: 'Tuteur', en: 'Tutor' },
  level: { fr: 'Nv.', en: 'Lv.' },
  power: { fr: 'Puissance', en: 'Power' },
  accuracy: { fr: 'Précision', en: 'Accuracy' },
  effect: { fr: 'Effet', en: 'Effect' },
  physical: { fr: 'Physique', en: 'Physical' },
  special: { fr: 'Spécial', en: 'Special' },
  status: { fr: 'Statut', en: 'Status' },

  // Locations
  notFoundWild: { fr: 'Ce Pokémon ne peut pas être trouvé à l\'état sauvage.', en: 'This Pokémon cannot be found in the wild.' },
  obtainedBy: { fr: 'Il peut être obtenu par évolution, échange ou événement spécial.', en: 'It can be obtained through evolution, trade or special event.' },
  otherLocations: { fr: 'autres lieux', en: 'other locations' },

  // Evolution chain
  noEvolutionFound: { fr: 'Aucune chaîne d\'évolution trouvée', en: 'No evolution chain found' },

  // Ability modal
  inGameDescription: { fr: 'Description en jeu', en: 'In-game description' },
  detailedEffect: { fr: 'Effet détaillé', en: 'Detailed effect' },
  pokemonWithAbility: { fr: 'Pokémon possèdent ce talent', en: 'Pokémon have this ability' },

  // Compare
  comparatorTitle: { fr: 'Comparateur', en: 'Comparator' },
  comparePokemon: { fr: 'Comparer les Pokémon', en: 'Compare Pokémon' },
  selectUpTo3: { fr: 'Sélectionnez jusqu\'à 3 Pokémon pour comparer leurs statistiques', en: 'Select up to 3 Pokémon to compare their stats' },
  addPokemon: { fr: 'Ajouter un Pokémon', en: 'Add a Pokémon' },
  searchAPokemon: { fr: 'Rechercher un Pokémon...', en: 'Search a Pokémon...' },
  noPokemonFoundSearch: { fr: 'Aucun Pokémon trouvé', en: 'No Pokémon found' },
  statsComparison: { fr: 'Comparaison des statistiques', en: 'Stats Comparison' },

  // Quiz
  quizTitle: { fr: 'Quiz Pokémon', en: 'Pokémon Quiz' },
  whoIsThat: { fr: 'Qui est ce Pokémon ?', en: "Who's that Pokémon?" },
  guessFromSilhouette: { fr: 'Devinez le Pokémon à partir de sa silhouette !', en: 'Guess the Pokémon from its silhouette!' },
  enterPokemonName: { fr: 'Entrez le nom du Pokémon...', en: 'Enter the Pokémon name...' },
  hint: { fr: 'Indice', en: 'Hint' },
  validate: { fr: 'Valider', en: 'Submit' },
  skip: { fr: 'Passer', en: 'Skip' },
  nextPokemon: { fr: 'Pokémon suivant', en: 'Next Pokémon' },
  bestStreak: { fr: 'Meilleure série', en: 'Best streak' },
  totalGuesses: { fr: 'Total essais', en: 'Total guesses' },
  hintsUsed: { fr: 'Indices utilisés', en: 'Hints used' },
  hintStartsWith: { fr: 'Le nom commence par', en: 'The name starts with' },
  hintContains: { fr: 'et contient', en: 'and contains' },
  hintLetters: { fr: 'lettres', en: 'letters' },
  seeDetails: { fr: 'Voir les détails →', en: 'See details →' },

  // Items
  itemsCatalog: { fr: 'Catalogue des Objets', en: 'Items Catalog' },
  discoverItems: { fr: 'Découvrez les objets et baies du monde Pokémon', en: 'Discover items and berries from the Pokémon world' },
  searchItemOrBerry: { fr: 'Rechercher un objet ou une baie...', en: 'Search an item or berry...' },
  items: { fr: 'Objets', en: 'Items' },
  berries: { fr: 'Baies', en: 'Berries' },
  berry: { fr: 'Baie', en: 'Berry' },
  item: { fr: 'Objet', en: 'Item' },
  price: { fr: 'Prix', en: 'Price' },
  category: { fr: 'Catégorie', en: 'Category' },
  size: { fr: 'Taille', en: 'Size' },
  growthTime: { fr: 'Temps de pousse', en: 'Growth time' },
  maxHarvest: { fr: 'Récolte max', en: 'Max harvest' },
  smoothness: { fr: 'Douceur', en: 'Smoothness' },
  flavors: { fr: 'Saveurs', en: 'Flavors' },
  firmness: { fr: 'Fermeté', en: 'Firmness' },
  noDescription: { fr: 'Aucune description disponible', en: 'No description available' },
  generation: { fr: 'Génération', en: 'Generation' },
  noResults: { fr: 'Aucun résultat', en: 'No results' },
  displayRange: { fr: 'Affichage', en: 'Display' },
  onTotal: { fr: 'sur', en: 'of' },

  // Footer
  footerDescription: { fr: "L'encyclopédie ultime des Pokémon. Un projet fan-made créé avec passion.", en: "The ultimate Pokémon encyclopedia. A fan-made project created with passion." },
  navigation: { fr: 'Navigation', en: 'Navigation' },
  resources: { fr: 'Ressources', en: 'Resources' },
  pokeapi: { fr: 'PokéAPI', en: 'PokéAPI' },
  pokemonOfficiel: { fr: 'Pokémon Officiel', en: 'Pokémon Officiel' },
  bulbapedia: { fr: 'Bulbapedia', en: 'Bulbapedia' },
  pokepedia: { fr: 'Poképédia', en: 'Poképédia' },
  pokemonCopyright: { fr: 'Pokémon © Nintendo / Game Freak / Creatures Inc.', en: 'Pokémon © Nintendo / Game Freak / Creatures Inc.' },
  copyright: { fr: 'Copyright © 2026 Pokédex. Tous droits réservés.', en: 'Copyright © 2026 Pokédex. All rights reserved.' },

  // Not Found
  notFoundTitle: { fr: '404', en: '404' },
  notFoundDescription: { fr: 'Oops! Page non trouvée', en: 'Oops! Page not found' },
  returnToHome: { fr: 'Retour à l\'accueil', en: 'Return to Home' },
} as const;

export function getVersionName(name: string, lang: Language): string {
  const versionNames: Record<string, Record<Language, string>> = {
    'red': { fr: 'Rouge', en: 'Red' },
    'blue': { fr: 'Bleu', en: 'Blue' },
    'yellow': { fr: 'Jaune', en: 'Yellow' },
    'gold': { fr: 'Or', en: 'Gold' },
    'silver': { fr: 'Argent', en: 'Silver' },
    'crystal': { fr: 'Cristal', en: 'Crystal' },
    'ruby': { fr: 'Rubis', en: 'Ruby' },
    'sapphire': { fr: 'Saphir', en: 'Sapphire' },
    'emerald': { fr: 'Émeraude', en: 'Emerald' },
    'firered': { fr: 'Rouge Feu', en: 'FireRed' },
    'leafgreen': { fr: 'Vert Feuille', en: 'LeafGreen' },
    'diamond': { fr: 'Diamant', en: 'Diamond' },
    'pearl': { fr: 'Perle', en: 'Pearl' },
    'platinum': { fr: 'Platine', en: 'Platinum' },
    'heartgold': { fr: 'Or HeartGold', en: 'HeartGold' },
    'soulsilver': { fr: 'Argent SoulSilver', en: 'SoulSilver' },
    'black': { fr: 'Noir', en: 'Black' },
    'white': { fr: 'Blanc', en: 'White' },
    'black-2': { fr: 'Noir 2', en: 'Black 2' },
    'white-2': { fr: 'Blanc 2', en: 'White 2' },
    'x': { fr: 'X', en: 'X' },
    'y': { fr: 'Y', en: 'Y' },
    'omega-ruby': { fr: 'Rubis Oméga', en: 'Omega Ruby' },
    'alpha-sapphire': { fr: 'Saphir Alpha', en: 'Alpha Sapphire' },
    'sun': { fr: 'Soleil', en: 'Sun' },
    'moon': { fr: 'Lune', en: 'Moon' },
    'ultra-sun': { fr: 'Ultra-Soleil', en: 'Ultra Sun' },
    'ultra-moon': { fr: 'Ultra-Lune', en: 'Ultra Moon' },
    'sword': { fr: 'Épée', en: 'Sword' },
    'shield': { fr: 'Bouclier', en: 'Shield' },
    'scarlet': { fr: 'Écarlate', en: 'Scarlet' },
    'violet': { fr: 'Violet', en: 'Violet' },
  };
  return versionNames[name]?.[lang] || name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}

// Flavor labels
export function getFlavorLabel(flavor: string, lang: Language): string {
  const labels: Record<string, Record<Language, string>> = {
    spicy: { fr: '🌶️ Épicé', en: '🌶️ Spicy' },
    dry: { fr: '🏜️ Sec', en: '🏜️ Dry' },
    sweet: { fr: '🍬 Sucré', en: '🍬 Sweet' },
    bitter: { fr: '☕ Amer', en: '☕ Bitter' },
    sour: { fr: '🍋 Acide', en: '🍋 Sour' },
  };
  return labels[flavor]?.[lang] || flavor;
}

// Noms des types Pokémon (fr / en)
export function getTypeLabel(type: string, lang: Language): string {
  const key = type.toLowerCase();
  const labels: Record<string, Record<Language, string>> = {
    normal: { fr: 'Normal', en: 'Normal' },
    fire: { fr: 'Feu', en: 'Fire' },
    water: { fr: 'Eau', en: 'Water' },
    electric: { fr: 'Électrik', en: 'Electric' },
    grass: { fr: 'Plante', en: 'Grass' },
    ice: { fr: 'Glace', en: 'Ice' },
    fighting: { fr: 'Combat', en: 'Fighting' },
    poison: { fr: 'Poison', en: 'Poison' },
    ground: { fr: 'Sol', en: 'Ground' },
    flying: { fr: 'Vol', en: 'Flying' },
    psychic: { fr: 'Psy', en: 'Psychic' },
    bug: { fr: 'Insecte', en: 'Bug' },
    rock: { fr: 'Roche', en: 'Rock' },
    ghost: { fr: 'Spectre', en: 'Ghost' },
    dragon: { fr: 'Dragon', en: 'Dragon' },
    dark: { fr: 'Ténèbres', en: 'Dark' },
    steel: { fr: 'Acier', en: 'Steel' },
    fairy: { fr: 'Fée', en: 'Fairy' },
  };
  return labels[key]?.[lang] ?? type.charAt(0).toUpperCase() + type.slice(1);
}
