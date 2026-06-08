import HomeClient from "@/src/components/home/HomeClient";
import {
  filterMegaPokemon,
  filterStarterPokemon,
  filterLegendaryPokemon,
  filterGigantamaxPokemon,
  filterAlolaPokemon,
  filterGalarPokemon,
  filterHisuiPokemon,
  filterMythicalPokemon,
} from "@/src/lib/utils";
import { getPokemonList } from "@/src/services/pokemon/list/api";

export default async function Page() {
  const allPokemonData = await getPokemonList();
  const allPokemon = allPokemonData ?? [];

  const megaPokemon = filterMegaPokemon(allPokemon);
  const starterPokemon = filterStarterPokemon(allPokemon);
  const legendaryPokemon = filterLegendaryPokemon(allPokemon);
  const mythicalPokemon = filterMythicalPokemon(allPokemon);
  const gigantamaxPokemon = filterGigantamaxPokemon(allPokemon);
  const alolaPokemon = filterAlolaPokemon(allPokemon);
  const galarPokemon = filterGalarPokemon(allPokemon);
  const hisuiPokemon = filterHisuiPokemon(allPokemon);

  return (
    <HomeClient
      allPokemon={allPokemon}
      megaPokemon={megaPokemon}
      starterPokemon={starterPokemon}
      legendaryPokemon={legendaryPokemon}
      mythicalPokemon={mythicalPokemon}
      gigantamaxPokemon={gigantamaxPokemon}
      alolaPokemon={alolaPokemon}
      galarPokemon={galarPokemon}
      hisuiPokemon={hisuiPokemon}
    />
  );
}
