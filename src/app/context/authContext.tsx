"use client";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
    updateUser: (updatedData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const updateUser = (updatedData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : prev));
  };

  useEffect(() => {
    const first_name = localStorage.getItem("first_name");
    const middle_name = localStorage.getItem("middle_name");
    const last_name = localStorage.getItem("last_name");
    const image = localStorage.getItem("image");
    if (first_name && middle_name && last_name && image) {
      setUser({ first_name, middle_name, last_name, image });
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    // Store in localStorage consistently
    localStorage.setItem("first_name", userData?.first_name);
    localStorage.setItem("middle_name", userData?.middle_name);
    localStorage.setItem("last_name", userData?.last_name);
    localStorage.setItem("image", userData?.image);
    // Update state
    setUser(userData);
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      // Call the logout API
      const response = await axios.post("/api/logout", {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Logout failed");
      }

      // Clear localStorage
      localStorage.removeItem("first_name");
      localStorage.removeItem("middle_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("image");

      // Clear user state
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // You might want to show a toast error here
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoggingOut,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// type User = {
//   first_name: string;
// };

// type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   isLoggingOut: boolean;
//   login: (userData: User) => void;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   useEffect(() => {
//     const first_name = localStorage.getItem("first_name");
//     if (first_name) {
//       setUser({ first_name });
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userData: User) => {
//     // Store in localStorage consistently
//     localStorage.setItem("first_name", userData?.first_name);
//     // Update state
//     setUser(userData);
//   };

//   const logout = async () => {
//     try {
//       setIsLoggingOut(true);
//       // Call the logout API
//       const response = await axios.post("/api/logout", {
//         withCredentials: true,
//       });

//       if (response.status !== 200) {
//         throw new Error("Logout failed");
//       }

//       // Clear localStorage
//       localStorage.removeItem("first_name");

//       // Clear user state
//       setUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//       // You might want to show a toast error here
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         isLoggingOut,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
