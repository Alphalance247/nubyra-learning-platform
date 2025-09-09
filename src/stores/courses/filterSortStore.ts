import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { environment } from "@/app/env/env.local";


// Define filter options interface
export interface FilterOptions {
  category: string[];
  courseCategory: string[];
  software: string[];
  price: string[];
  minPrice?: number;
  maxPrice?: number;
}

// Define course interface for filtered results
export interface FilteredCourse {
  id?: string; // Optional because some courses use cid instead
  cid: string;
  title?: string;
  image: string;
  duration?: string;
  number_of_days?: number;
  price?: string | number;
  course_tab?: string;
  category?: string;
  level?: string;
  software?: string;
  created_at?: string;
}

// Define the store interface
interface FilterSortStore {
  // Filter options data
  filterOptions: {
    categories: string[];
    courseCategories: string[];
    software: string[];
    priceRanges: string[];
  } | null;
  
  // Current filter and sort state
  currentFilters: FilterOptions;
  currentSort: string;
  
  // Loading and error states
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchFilterOptions: () => Promise<void>;
  applyFiltersAndSort: (filters: FilterOptions, sort: string) => Promise<FilteredCourse[]>;
  setCurrentFilters: (filters: FilterOptions) => void;
  setCurrentSort: (sort: string) => void;
}

export const useFilterSortStore = create<FilterSortStore>((set) => ({
  // Initial state
  filterOptions: null,
  currentFilters: {
    category: [],
    courseCategory: [],
    software: [],
    price: [],
  },
  currentSort: "Recent",
  loading: false,
  error: null,

  // Fetch available filter options from the API
  fetchFilterOptions: async () => {
    set({ loading: true, error: null });
    try {
      // First, get the filter options by calling the endpoint with empty filters
      const res = await axios.get(`${environment?.baseUrl}/sort_filter/`, {
        params: {
          category: [],
          courseCategory: [],
          software: [],
          price: [],
          sort: "Recent"
        }
      });
      
      // Extract unique filter options from the response
      const courses = res.data.courses || [];
      const categories = [...new Set(courses.map((course: FilteredCourse) => course.category).filter(Boolean))] as string[];
      const courseCategories = [...new Set(courses.map((course: FilteredCourse) => course.course_tab).filter(Boolean))] as string[];
      const software = [...new Set(courses.map((course: FilteredCourse) => course.software).filter(Boolean))] as string[];
      
      set({
        filterOptions: {
          categories: categories.length > 0 ? categories : ["Web Development", "Data Science", "Design", "Process Engineer"],
          courseCategories: courseCategories.length > 0 ? courseCategories : ["Basic", "Intermediate", "Advanced", "Professional"],
          software: software.length > 0 ? software : ["Aspen HYSYS", "Aspen Plus", "AutoCAD P&ID", "AutoCAD Plant 3D"],
          priceRanges: ["Free", "$0 - $50", "$50 - $100", "$100 - $200", "Above $200"]
        },
        loading: false
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
      // Fallback to default options if API fails
      set({
        filterOptions: {
          categories: ["Web Development", "Data Science", "Design", "Process Engineer"],
          courseCategories: ["Basic", "Intermediate", "Advanced", "Professional"],
          software: ["Aspen HYSYS", "Aspen Plus", "AutoCAD P&ID", "AutoCAD Plant 3D"],
          priceRanges: ["Free", "$0 - $50", "$50 - $100", "$100 - $200", "Above $200"]
        },
        loading: false
      });
    }
  },

  // Apply filters and sort to get filtered courses
  applyFiltersAndSort: async (filters: FilterOptions, sort: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${environment?.baseUrl}/sort_filter/`, {
        params: {
          ...filters,
          sort,
        }
      });
      
      set({ loading: false });
      return res.data.courses || [];
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
      return [];
    }
  },

  // Set current filters
  setCurrentFilters: (filters: FilterOptions) => {
    set({ currentFilters: filters });
  },

  // Set current sort
  setCurrentSort: (sort: string) => {
    set({ currentSort: sort });
  },
}));
