import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface courseListDataStore {
  courses: {
    id: string;
    title: string;
    number_of_days: string;
    image: string;
    price: number;
    duration: number;
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

  fetchCourseList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/courses/'); 
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
