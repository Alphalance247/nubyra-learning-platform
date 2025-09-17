import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";

export interface Blog {
  id: string;
  title: string;
  blog_images: {
    image: string;
  }[];
  post_meta: {
    author_name: string[];
    date: string;
  };
}

export interface BlogData {
  blogs: Blog[];
  current_page: number;
  total_pages: number;
  total_items?: number;
}

interface BlogStore {
  data: BlogData | null;
  loading: boolean;
  error: string | null;
  fetchAllBlogs: (page?: number) => Promise<void>;
  filterBlogs: (
    filters: string[],
    sort: string,
    page?: number
  ) => Promise<void>;
}

export const getAllBlogs = create<BlogStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAllBlogs: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${environment?.baseUrl}/blogs/`, {
        page,
      });
      
      if (res.status === 200 && Array.isArray(res.data.response?.blogs)) {
        set({ 
          data: {
            blogs: res.data.response.blogs,
            current_page: res.data.response.current_page || page,
            total_pages: res.data.response.total_pages || 1,
            total_items: res.data.response.total_items
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

  filterBlogs: async (filters, sort, page = 1) => {
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
      const url = `${environment?.baseUrl}/blogs/${params.toString() ? `?${params.toString()}` : ""}`;

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

      if (res.status === 200 && Array.isArray(res.data.response?.blogs)) {
        set({ 
          data: {
            blogs: res.data.response.blogs,
            current_page: res.data.response.current_page || page,
            total_pages: res.data.response.total_pages || 1,
            total_items: res.data.response.total_items
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
