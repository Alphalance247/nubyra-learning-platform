import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

interface projectListDataStore {
  response: {
    id: string;
    images: {
      image: string;
    }[];
    field: {
      label: string;
    };
    project_type: string;
    project_title: string;
    project_scope: string;
    project_duration: string;
    country: string;
    prid: string;
    project_completion_date: string;
  }[];
}

interface projectListStore {
  data: projectListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchProjectList: () => Promise<void>;
}

interface projectListStore {
  data: projectListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchProjectList: () => Promise<void>;
}

export const getProjectListStore = create<projectListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchProjectList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/executed-projects");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
