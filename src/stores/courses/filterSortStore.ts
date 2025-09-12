import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";
// store/types.ts

export interface FilterOption {
  label: string;
  value: string;
}

export type FilterValue = string[] | FilterOption[];

export interface FilterGroup {
  [key: string]: FilterValue; 
}

export interface FilterResponse {
  filters: FilterGroup[];
  sorts: { label: string, value: string }[];
}


interface FilterSortStore {
  data: FilterResponse | null;
  loading: boolean;
  error: string | null;
  fetchFilterOptions: () => Promise<void>;
  applyFiltersAndSort: () => Promise<FilterResponse | null>;
}

export const useFilterSortStore = create<FilterSortStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchFilterOptions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<FilterResponse>(
        `${environment?.baseUrl}/sort_filter/`
      );
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
      const res = await axios.get<FilterResponse>(
        `${environment?.baseUrl}/sort_filter/`
      );
      set({ loading: false });
      return res.data ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
      return null;
    }
  },
}));
