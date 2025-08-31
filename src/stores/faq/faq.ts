import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";

interface faqDataStore {
  results: {
    id: string;
    question: string;
    answer: string;
    option: string;
  }[];
}

interface faqStore {
  data: faqDataStore | null;
  loading: boolean;
  error: string | null;
  fetchFaq: () => Promise<void>;
}

export const getFaq = create<faqStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchFaq: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${environment?.baseUrl}/faq/`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
