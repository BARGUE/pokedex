import { getPokemonList } from "@/src/services/pokemon/list/api";
import { getPokemonDetail } from "@/src/services/pokemon/detail/api";
import { CompareClient } from "@/src/components/compare/CompareClient";
import { Header } from "@/src/components/Header";
import Footer from "@/src/components/Footer";

function normalizePokemonParam(
    pokemon: string | string[] | undefined
): string[] {
    if (!pokemon) return [];
    const arr = Array.isArray(pokemon) ? pokemon : [pokemon];
    return arr.filter(Boolean).slice(0, 3);
}

export default async function ComparePage({
    searchParams,
}: {
    searchParams: Promise<{ pokemon?: string | string[] }>;
}) {
    const params = await searchParams;
    const names = normalizePokemonParam(params.pokemon);

    const [initialPokemonList, ...detailResults] = await Promise.all([
        getPokemonList(),
        ...names.map((name) =>
            getPokemonDetail(name).catch(() => null)
        ),
    ]);

    const initialDetails: (Awaited<ReturnType<typeof getPokemonDetail>> | null)[] = [
        detailResults[0] ?? null,
        detailResults[1] ?? null,
        detailResults[2] ?? null,
    ];

    const initialSelectedNames: (string | null)[] = [
        names[0] ?? null,
        names[1] ?? null,
        names[2] ?? null,
    ];

    return (
        <div className="min-h-screen bg-[#0f131a]">
            <Header isGoBack />
            <CompareClient
                initialPokemonList={initialPokemonList}
                initialDetails={initialDetails}
                initialSelectedNames={initialSelectedNames}
            />
            <Footer />
        </div>

    );
}
