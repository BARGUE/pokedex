import { Header } from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import PokedexClient from "@/src/components/pokedex/PokedexClient";
import { PokemonTypeItem } from "@/src/services/pokemon/info/types";
import { getPokedex } from "@/src/services/pokedex/api";

export default async function PokedexPage() {
  const { pokemon, types } = await getPokedex();

  const allTypes: PokemonTypeItem[] =
    types?.filter(
      (t) => t.key !== "unknown" && t.key !== "stellar"
    ) ?? [];

  return (
    <div className="min-h-screen bg-[#0f131a]">
      <Header isGoBack />
      <PokedexClient allPokemon={pokemon} allTypes={allTypes} />
      <Footer />
    </div>
  );
}
