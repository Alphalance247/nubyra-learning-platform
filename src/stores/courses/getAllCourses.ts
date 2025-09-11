import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";

export interface freeCourseData {
  courses: {
    course_tab: string;
    duration: string;
    title: string;
    cid: string;
    image: string;
  }[];
  current_page: number;
  total_pages: number;
}

export interface premiumCourseData {
  courses: {
    course_tab: string;
    duration: string;
    cid: string;
    title: string;
    image: string;
  }[];
  current_page: number;
  total_pages: number;
}

export interface webinarCourseData {
  courses: {
    id: string;
    title: string;
    number_of_days: number;
    image: string;
    price: string;
    cid: string;
    duration: string;
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
      const res = await axios.get(`${environment?.baseUrl}/allCoursesList/`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
