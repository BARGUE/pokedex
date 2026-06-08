import { useEffect, useMemo } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function usePagination<T>(
  list: T[],
  perPage: number,
  page: number,
  setPage: (v: number | ((p: number) => number)) => void
) {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const safePage = clamp(page, 1, totalPages);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [safePage, totalPages, list.length, perPage, page, setPage]);

  const slice = useMemo(() => {
    const startIndex = (safePage - 1) * perPage;
    return list.slice(startIndex, startIndex + perPage);
  }, [list, safePage, perPage]);

  const start = list.length === 0 ? 0 : (safePage - 1) * perPage + 1;
  const end = Math.min(safePage * perPage, list.length);

  return {
    slice,
    totalPages,
    safePage,
    hasPrevious: safePage > 1,
    hasNext: safePage < totalPages,
    start,
    end,
    next: () => setPage((p) => Math.min(p + 1, totalPages)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
  };
}
