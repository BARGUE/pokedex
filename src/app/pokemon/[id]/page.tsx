import { Header } from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { PokemonSkeleton } from "@/src/components/pokemon-detail/PokemonSkeleton";
import { PokemonHero } from "@/src/components/pokemon-detail/PokemonHero";
import { PokemonDetailClient } from "@/src/components/pokemon-detail/PokemonDetailClient";
import { getPokemonDetail } from "@/src/services/pokemon/detail/api";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const { pokemon, species, pokemonStats, pokemonMoves, pokemonEvolution, pokemonEncounters, pokemonWeaknesses } = await getPokemonDetail(id);

  if (!pokemon) {
    return <PokemonSkeleton />;
  }

  const primaryType = pokemon.species.types?.[0]?.key ?? "normal";
  const speciesLocalized = pokemon.species.localized ?? null;

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : undefined;
  const nextId = pokemon.id + 1;

  return (
    <div className="min-h-screen bg-[#0f131a]">
      <Header isGoBack navigation prevId={prevId} nextId={nextId} />

      <div className="max-w-6xl mx-auto px-6 pt-[72px]">
        <PokemonHero
          pokemon={pokemon}
          species={species}
          primaryType={primaryType}
          speciesLocalized={speciesLocalized}
        />
        <PokemonDetailClient
          pokemonStats={pokemonStats}
          pokemonWeaknesses={pokemonWeaknesses}
          pokemonMoves={pokemonMoves}
          pokemonEvolution={pokemonEvolution}
          pokemonEncounters={pokemonEncounters}
        />
      </div>

      <Footer />
    </div>
  );
}
