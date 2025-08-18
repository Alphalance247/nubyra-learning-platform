import { create } from "zustand";
import axiosInstance from "@/app/utils/axios"; 
import toast from "react-hot-toast";
import { AxiosError } from "axios";


interface Blog {
  id: number;
  title: string;
  content: string;
}

type RegisteredCourse = {
  id: number;
  cid: string;
  attendance: boolean;
  certificate: string;
  course_cat: string;
  course_title: string;
  other_participants: string;
  payment_ref_id: string;
  price: number | null;
  registration_id: string;
  status: string;
};


type CourseInfo = {
  registered_courses: RegisteredCourse[];
};

interface ProfileData {
  primary_info: {
    full_name: string;
    email: string;
  };
  project_subscription: boolean;
  course_info: CourseInfo;
  blogs_saved: Record<string, Blog>;

}

interface UpdateUserPayload {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  email: string;
  imageFile: File | null; 
}

interface AuthStore {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  updateUserData: (data: UpdateUserPayload | FormData) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchUserData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/dashboard/");
      console.log("Fetched user data:", res.data);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },


updateUserData: async (updatedData: UpdateUserPayload | FormData) => {
  set({ loading: true, error: null });

  try {
    const isFormData = updatedData instanceof FormData;

    const res = await axiosInstance.patch("/user/update/", updatedData, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });

    set({ data: res.data, loading: false });

  } catch (err) {
    if (err instanceof AxiosError) {
      toast.error(err.message);

      if (err.response) {
        set({ error: JSON.stringify(err.response.data), loading: false });
      } else if (err.request) {
        set({ error: "No response from server", loading: false });
      } else {
        set({ error: "Unexpected error occurred", loading: false });
      }
    } else {
      set({ error: "Unexpected error occurred", loading: false });
    }
  }
}


}));
