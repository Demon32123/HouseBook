import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import avatarPlaceholder from "../../image/avatar.png";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  booksCount: number;
  joinedDate: string;
  privacy: {
    showLibrary: boolean;
    showProfile: boolean;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "housebook_tokens";
const API_URL = "http://localhost:3001";

const mapUser = (data: any): AuthUser => ({
  id: String(data.id),
  name: data.name,
  email: data.email,
  avatar:
    data.avatarUrl ||
    avatarPlaceholder,
  bio: data.bio || "",
  booksCount: 0,
  joinedDate: data.createdAt
    ? data.createdAt.split("T")[0]
    : new Date().toISOString().split("T")[0],
  privacy: {
    showLibrary: true,
    showProfile: true,
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const initSession = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.refreshToken) {
            const res = await fetch(`${API_URL}/auth/refresh`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${parsed.refreshToken}`,
              },
            });
            if (res.ok) {
              const data = await res.json();
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                  accessToken: data.accessToken,
                  refreshToken: data.refreshToken,
                }),
              );
              setUser(mapUser(data.user));
            } else {
              localStorage.removeItem(STORAGE_KEY);
            }
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (err) {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };
    initSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const payloadEmail =
        email === "alexey@example.com" ? "alexey@housebook.local" : email;
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: payloadEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || "Ошибка входа" };
      }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );
      setUser(mapUser(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: "Ошибка сети" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || "Ошибка регистрации" };
      }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );
      setUser(mapUser(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: "Ошибка сети" };
    }
  };

  const logout = async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.accessToken) {
          await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${parsed.accessToken}`,
            },
          });
        }
      } catch (e) {}
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = (updates: Partial<AuthUser>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
