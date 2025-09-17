import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";

export interface Project {
  images: { image: string }[];
  project_title: string;
  project_type: string;
  country: string;
  project_scope: string;
  project_duration: string;
  prid: string;
}

export interface ProjectData {
  projects: Project[];
  current_page: number;
  total_pages: number;
  total_items?: number;
}

interface ProjectStore {
  data: ProjectData | null;
  loading: boolean;
  error: string | null;
  fetchAllProjects: (page?: number) => Promise<void>;
  filterProjects: (
    filters: string[],
    sort: string,
    page?: number
  ) => Promise<void>;
}

export const getAllProjects = create<ProjectStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAllProjects: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${environment?.baseUrl}/project-list/`, {
        page,
      });
      
      if (res.status === 200 && Array.isArray(res.data.projects)) {
        set({ 
          data: {
            projects: res.data.projects,
            current_page: res.data.current_page || page,
            total_pages: res.data.total_pages || 1,
            total_items: res.data.total_items
          }, 
          loading: false 
        });
      } else {
        set({ error: "Invalid response format", loading: false });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "Unexpected error", loading: false });
      }
    }
  },

  filterProjects: async (filters, sort, page = 1) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();

      // sort
      if (sort) params.set("sort", sort);

      // filters (allow multiple values)
      if (Array.isArray(filters)) {
        filters.filter(Boolean).forEach((f) => {
          params.append("filter", f);
        });
      } else if (filters) {
        params.append("filter", String(filters));
      }

      // page
      if (page) params.set("page", String(page));

      // build URL with query string
      const url = `${environment?.baseUrl}/project-list/${params.toString() ? `?${params.toString()}` : ""}`;

      // send request with filters, sort, and page in body
      const res = await axios.post(
        url,
        { 
          filter: Array.isArray(filters) ? filters : [filters].filter(Boolean), 
          sort, 
          page 
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200 && Array.isArray(res.data.projects)) {
        set({ 
          data: {
            projects: res.data.projects,
            current_page: res.data.current_page || page,
            total_pages: res.data.total_pages || 1,
            total_items: res.data.total_items
          }, 
          loading: false 
        });
      } else {
        set({ error: "Invalid response format", loading: false });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "Unexpected error", loading: false });
      }
    }
  },
}));
