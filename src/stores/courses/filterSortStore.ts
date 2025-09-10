import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";

export interface FilterData {
  categories: string[];
  courseCategories: string[];
  software: string[];
  priceRanges: string[];
}

interface FilterSortStore {
  data: FilterData | null;
  loading: boolean;
  error: string | null;
  fetchFilterOptions: () => Promise<void>;
  applyFiltersAndSort: () => Promise<FilterData[]>;
}

export const useFilterSortStore = create<FilterSortStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchFilterOptions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<FilterData>(`${environment?.baseUrl}/sort_filter/`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },

  applyFiltersAndSort: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<FilterData[]>(`${environment?.baseUrl}/sort_filter/`);
      set({ loading: false });
      return res.data ?? [];
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
      return [];
    }
  },
}));
