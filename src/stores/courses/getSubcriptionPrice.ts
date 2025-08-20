import { environment } from "@/app/env/env.local";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface subcriptionPriceDataStore {
  sub_price: string;
}

interface subcribePriceListStore {
  data: subcriptionPriceDataStore | null;
  loading: boolean;
  error: string | null;
  fetchSubscribePrice: () => Promise<void>;
}

export const getSubsriptionPriceListStore = create<subcribePriceListStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchSubscribePrice: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axios.get(
          `${environment?.baseUrl}/subscription-price/`
        );
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
