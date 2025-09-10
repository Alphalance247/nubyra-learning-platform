import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";

interface courseListDataStore {
  courses: {
    id: string;
    title: string;
    number_of_days: number;
    image: string;
    price: number;
    duration: number;
    cid: string;
  }[];
}

interface courseListStore {
  data: courseListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchCourseList: () => Promise<void>;
}

export const getCourseListStore = create<courseListStore>((set) => ({
  data: null,
  loading: false,
  error: null,
// 
  fetchCourseList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${environment?.baseUrl}/courses/`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
