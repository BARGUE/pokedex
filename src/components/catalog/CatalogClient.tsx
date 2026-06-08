"use client";

import { useMemo, useState } from "react";
import { Cherry, Package, Search } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

import type { BerryDetail, ItemDetail } from "@/src/services/item-detail/types";
import { usePagination } from "@/src/hooks/usePagination";
import { ItemsGrid } from "./ItemsGrid";
import { BerriesGrid } from "./BerriesGrid";
import { PaginationControls } from "./PaginationControls";
import { ItemModal } from "./ItemModal";
import { BerryModal } from "./BerryModal";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

const PAGE_SIZE_OPTIONS = [20, 50, 100] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

function ensureArray<T>(value: T[] | { data?: T[]; results?: T[] } | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    if (Array.isArray((value as { data?: T[] }).data)) return (value as { data: T[] }).data;
    if (Array.isArray((value as { results?: T[] }).results)) return (value as { results: T[] }).results;
  }
  return [];
}

export function CatalogClient({
  items,
  berries,
}: {
  items: ItemDetail[] | { data?: ItemDetail[]; results?: ItemDetail[] };
  berries: BerryDetail[] | { data?: BerryDetail[]; results?: BerryDetail[] };
}) {
  const { t } = useLanguage();
  const itemsList = useMemo(() => ensureArray(items), [items]);
  const berriesList = useMemo(() => ensureArray(berries), [berries]);

  const [activeTab, setActiveTab] = useState<"items" | "berries">("items");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState<PageSize>(20);

  const [itemsPage, setItemsPage] = useState(1);
  const [berriesPage, setBerriesPage] = useState(1);

  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const [selectedBerry, setSelectedBerry] = useState<BerryDetail | null>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return itemsList;
    return itemsList.filter((it) => {
      const key = (it.key ?? "").toLowerCase();
      const fr = (it.localized?.fr?.name ?? "").toLowerCase();
      const en = (it.localized?.en?.name ?? "").toLowerCase();
      return key.includes(q) || fr.includes(q) || en.includes(q);
    });
  }, [itemsList, searchQuery]);

  const filteredBerries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return berriesList;
    return berriesList.filter((b) => {
      const key = (b.key ?? "").toLowerCase();
      const fr = (b.localized?.fr?.name ?? "").toLowerCase();
      const en = (b.localized?.en?.name ?? "").toLowerCase();
      return key.includes(q) || fr.includes(q) || en.includes(q);
    });
  }, [berriesList, searchQuery]);

  const itemsPg = usePagination(filteredItems, perPage, itemsPage, setItemsPage);
  const berriesPg = usePagination(filteredBerries, perPage, berriesPage, setBerriesPage);

  const selectedItem = useMemo(() => {
    if (!selectedItemKey) return null;
    return itemsList.find((it) => it.key === selectedItemKey) ?? null;
  }, [itemsList, selectedItemKey]);

  const handlePerPageChange = (value: string) => {
    const parsed = Number(value);
    if (PAGE_SIZE_OPTIONS.includes(parsed as PageSize)) {
      setPerPage(parsed as PageSize);
      setItemsPage(1);
      setBerriesPage(1);
    }
  };

  const rangeText =
    activeTab === "items"
      ? filteredItems.length === 0
        ? t(translations.noResults)
        : `${t(translations.displayRange)} ${itemsPg.start} - ${itemsPg.end} ${t(translations.onTotal)} ${filteredItems.length}`
      : filteredBerries.length === 0
        ? t(translations.noResults)
        : `${t(translations.displayRange)} ${berriesPg.start} - ${berriesPg.end} ${t(translations.onTotal)} ${filteredBerries.length}`;

  return (
    <main className="max-w-4xl mx-auto pt-[72px]">
      <div className="text-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold mb-2 font-display px-6 py-8"
          style={{
            background: "linear-gradient(135deg, hsl(160 80% 45%), hsl(180 80% 45%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t(translations.itemsCatalog)}
        </h1>
        <p className="text-[#8f96a3] text-lg">{t(translations.discoverItems)}</p>
      </div>

      <div className="relative mb-6 max-w-md mx-auto flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8f96a3]" />
          <Input
            type="text"
            placeholder={t(translations.searchItemOrBerry)}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setItemsPage(1);
              setBerriesPage(1);
            }}
            className="pl-12 pr-4 py-6 rounded-full bg-[#171c26] shadow-card border-2 border-[#29303d] focus-visible:ring-offset-0 text-gray-300"
          />
        </div>

        <Select value={String(perPage)} onValueChange={handlePerPageChange}>
          <SelectTrigger className="w-[110px] h-[44px] bg-[#252b37] border-none text-[#f0f2f4] rounded-full hover:bg-[#353560] transition-colors outline-none focus:ring-0">
            <SelectValue placeholder="20" />
          </SelectTrigger>
          <SelectContent className="bg-[#252b37] border-[#353560]">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)} className="text-[#f0f2f4] cursor-pointer">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "items" | "berries")} className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-2 bg-[#0f131a] rounded-full p-1 border border-[#29303d]">
          <TabsTrigger
            value="items"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3]"
          >
            <Package className="w-4 h-4 mr-2" />
            {t(translations.items)} ({filteredItems.length})
          </TabsTrigger>

          <TabsTrigger
            value="berries"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3]"
          >
            <Cherry className="w-4 h-4 mr-2" />
            {t(translations.berries)} ({filteredBerries.length})
          </TabsTrigger>
        </TabsList>

        <p className="text-gray-500 text-sm text-center pb-8">{rangeText}</p>

        <TabsContent value="items">
          <ItemsGrid items={itemsPg.slice} onSelect={setSelectedItemKey} />

          <PaginationControls
            hasPrevious={itemsPg.hasPrevious}
            hasNext={itemsPg.hasNext}
            safePage={itemsPg.safePage}
            totalPages={itemsPg.totalPages}
            onPrev={itemsPg.prev}
            onNext={itemsPg.next}
            nextGradientClass="bg-gradient-to-r from-emerald-500 to-teal-600"
          />
        </TabsContent>

        <TabsContent value="berries">
          <BerriesGrid berries={berriesPg.slice} onSelect={setSelectedBerry} />

          <PaginationControls
            hasPrevious={berriesPg.hasPrevious}
            hasNext={berriesPg.hasNext}
            safePage={berriesPg.safePage}
            totalPages={berriesPg.totalPages}
            onPrev={berriesPg.prev}
            onNext={berriesPg.next}
            nextGradientClass="bg-gradient-to-r from-pink-500 to-rose-600"
          />
        </TabsContent>
      </Tabs>

      <ItemModal
        open={!!selectedItemKey}
        onOpenChange={(open) => !open && setSelectedItemKey(null)}
        item={selectedItem}
        loading={false}
      />

      <BerryModal
        open={!!selectedBerry}
        onOpenChange={(open) => !open && setSelectedBerry(null)}
        berry={selectedBerry}
      />

    </main>
  );
}
