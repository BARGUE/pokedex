import { Header } from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { CatalogClient } from "@/src/components/catalog/CatalogClient";
import { getItemDetail } from "@/src/services/item-detail/api";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const { items, berries } = await getItemDetail();

  return (
    <div className="min-h-screen bg-[#0f131a]">
      <Header isGoBack />
      <CatalogClient items={items} berries={berries} />
      <Footer />
    </div>
  );
}
