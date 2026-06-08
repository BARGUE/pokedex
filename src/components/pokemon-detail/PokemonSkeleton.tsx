import { Header } from "@/src/components/Header";

export function PokemonSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f131a]">
      <Header isGoBack navigation />
      <div className="max-w-6xl mx-auto px-6 pt-[72px]">
        <div className="grid lg:grid-cols-2 gap-8 pt-8">
          <div className="aspect-square rounded-3xl bg-[#171c26] animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 w-20 bg-[#171c26] rounded animate-pulse" />
            <div className="h-12 w-48 bg-[#171c26] rounded animate-pulse" />
            <div className="h-8 w-32 bg-[#171c26] rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}