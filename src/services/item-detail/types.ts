export type ItemDetail = {
  id: number;
  key: string;
  categoryKey: string;
  cost: number;
  attributes: string[];
  assets: { sprite: string };
  localized: {
    en?: {
      name: string;
      effect?: { short?: string; long?: string };
      flavor?: string;
    };
    fr?: {
      name: string;
      effect?: { short?: string; long?: string };
      flavor?: string;
    };
  };
};

export type BerryDetail = {
  id: number;
  key: string;
  itemKey: string;
  agriculture: {
    firmness: string;
    growthTime: number;
    maxHarvest: number;
    soilDryness: number;
    size: number;
    smoothness: number;
  };
  battle: {
    naturalGiftPower: number;
  };
  flavors: { key: string; potency: number }[];
  assets: { sprite: string };
  localized: {
    en?: { name: string | null };
    fr?: { name: string | null };
  };
};

export type ItemDetailResponse = {
  items: ItemDetail[];
  berries: BerryDetail[];
};
