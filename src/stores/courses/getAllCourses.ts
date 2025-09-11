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
  current_page: number;
  total_pages: number;
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
  filterCourses: (
    filters: string[],
    sort: string,
    page?: number
  ) => Promise<void>;
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

  filterCourses: async (filters, sort, page) => {
    set({ loading: true, error: null });
    try {
      const filterString = Array.isArray(filters)
        ? filters.filter(Boolean).join(",")
        : String(filters ?? "");
      const params = new URLSearchParams();
      if (sort) params.set("sort", sort);
      if (filterString) params.set("filter", filterString);
      if (page) params.set("page", String(page));

      const url = `${environment?.baseUrl}/allCoursesList/${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await axios.post(url, { filter: filterString, sort, page }, {
        headers: { "Content-Type": "application/json" },
      });

      const raw = res.data;

      // Client-side fallback filtering if backend returns unfiltered results
      const selectedTerms = (Array.isArray(filters) ? filters : [filterString])
        .filter(Boolean)
        .map((s) => String(s).toLowerCase());

      const termMatches = (text?: unknown) => {
        if (!selectedTerms.length) return true;
        if (typeof text !== "string") return false;
        const lower = text.toLowerCase();
        return selectedTerms.some((t) => lower.includes(t));
      };

      type TrainingSoftware = { name?: string };
      type GenericCourse = { title?: string; category?: string; training_software?: TrainingSoftware[] };

      const arrayMatches = (arr?: TrainingSoftware[]) => {
        if (!Array.isArray(arr)) return false;
        const joined = arr
          .map((x) => (typeof x?.name === "string" ? x.name : ""))
          .filter(Boolean)
          .join(" ");
        return termMatches(joined);
      };

      const filterCoursesArray = <T extends GenericCourse>(courses: T[]): T[] => {
        if (!selectedTerms.length) return courses;
        return courses.filter((c) =>
          termMatches(c.title) || termMatches(c.category) || arrayMatches(c.training_software)
        );
      };

      const filteredData: allCourseDataStore | null = raw
        ? {
          ...(raw as allCourseDataStore),
          Webinar: raw?.Webinar
            ? {
              ...(raw.Webinar as webinarCourseData),
              courses: filterCoursesArray(raw.Webinar.courses || []),
            }
            : (raw?.Webinar as webinarCourseData),
          Premium: raw?.Premium
            ? {
              ...(raw.Premium as premiumCourseData),
              courses: filterCoursesArray(raw.Premium.courses || []),
            }
            : (raw?.Premium as premiumCourseData),
          Free: raw?.Free
            ? {
              ...(raw.Free as freeCourseData),
              courses: filterCoursesArray(raw.Free.courses || []),
            }
            : (raw?.Free as freeCourseData),
        }
        : null;

      set({ data: filteredData, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "Unexpected error", loading: false });
      }
    }
  },
}));
