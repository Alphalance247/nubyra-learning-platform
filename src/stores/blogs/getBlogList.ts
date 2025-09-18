import { environment } from "@/app/env/env.local";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface blogListDataStore {
  response: {
    id: string;
    image: string;
    project_type: string;
    project_title: string;
    project_scope: string;
    project_duration: string;
    country: string;
  }[];
}

interface blogListStore {
  data: blogListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchBlogList: () => Promise<void>;
}

export const getBlogListStore = create<blogListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchBlogList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${environment?.baseUrl}/blogs/`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
