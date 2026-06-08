const STORAGE_KEY = "pokedex-compare";
const MAX_SLOTS = 3;
export const EMPTY_COMPARE_SELECTION: CompareSelection = [null, null, null];
const EMPTY = EMPTY_COMPARE_SELECTION;

export type CompareSelection = (string | null)[];

const listeners = new Set<() => void>();

function ensureLength(arr: (string | null)[]): CompareSelection {
  const slice = arr.filter((x): x is string => x != null).slice(0, MAX_SLOTS);
  const result: (string | null)[] = [...slice];
  while (result.length < MAX_SLOTS) result.push(null);
  return result as CompareSelection;
}

export function getCompareSelection(): CompareSelection {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return EMPTY;
    const arr = parsed
      .slice(0, MAX_SLOTS)
      .map((x: unknown) => (typeof x === "string" ? x : null));
    return ensureLength(arr);
  } catch {
    return EMPTY;
  }
}

export function setCompareSelection(names: CompareSelection): void {
  if (typeof window === "undefined") return;
  try {
    const toStore = ensureLength(names);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    listeners.forEach((l) => l());
  } catch {
    // ignore
  }
}

export function subscribeCompareSelection(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
