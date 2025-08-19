import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface subscriptionStatusDataStore {
  sub_status: boolean;
}

interface subscriptionStore {
  data: subscriptionStatusDataStore | null;
  loading: boolean;
  error: string | null;
  fetchSubscriptionStatus: () => Promise<void>;
}

export const getSubscriotionStatusStore = create<subscriptionStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchSubscriptionStatus: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/get-subscription-status/");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
