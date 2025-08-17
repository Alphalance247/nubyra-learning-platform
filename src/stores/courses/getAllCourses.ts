import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface freeCourseData {
  courses: {
    course_tab: string;
    duration: string;
    title: string;
    cid: string;
  }[];
  current_page: number;
  total_pages: number;
}

interface premiumCourseData {
  courses: {
    course_tab: string;
    duration: string;
    cid: string;
    title: string;
  }[];
  current_page: number;
  total_pages: number;
}

interface webinarCourseData {
  courses: {
    id: string;
    title: string;
    number_of_days: number;
    image: string;
    price: number;
    cid: string;
    duration: number;
  }[];
}

interface allCourseDataStore {
  Free: freeCourseData | null;
  Webinar: webinarCourseData;
  Premium: premiumCourseData | null;
}

interface allCourseStore {
  data: allCourseDataStore | null;
  loading: boolean;
  error: string | null;
  fetchAllCourses: () => Promise<void>;
}

export const getAllCourses = create<allCourseStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAllCourses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/allCoursesList/");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
