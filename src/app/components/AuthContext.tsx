import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "housebook_auth";

const defaultUser: AuthUser = {
  id: "user-1",
  name: "Алексей Петров",
  email: "alexey@example.com",
  avatar:
    "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE0MTUxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bio: "Люблю читать классику и научную фантастику",
  booksCount: 12,
  joinedDate: "2025-01-15",
  privacy: {
    showLibrary: true,
    showProfile: true,
  },
};

// Mock registered users (for demo purposes)
const mockUsers: { email: string; password: string; user: AuthUser }[] = [
  {
    email: "alexey@example.com",
    password: "password123",
    user: defaultUser,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const found = mockUsers.find((u) => u.email === email);
    if (!found) {
      // Accept any password for demo — just create a session with default user
      if (email.includes("@")) {
        const newUser: AuthUser = {
          ...defaultUser,
          email,
          id: `user-${Date.now()}`,
        };
        setUser(newUser);
        return { success: true };
      }
      return { success: false, error: "Неверный формат email" };
    }

    // For the mock user, check password loosely
    if (password.length < 6) {
      return { success: false, error: "Пароль должен быть не менее 6 символов" };
    }

    setUser(found.user);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800));

    if (!name.trim()) {
      return { success: false, error: "Введите ваше имя" };
    }
    if (!email.includes("@")) {
      return { success: false, error: "Неверный формат email" };
    }
    if (password.length < 6) {
      return { success: false, error: "Пароль должен быть не менее 6 символов" };
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      avatar: defaultUser.avatar,
      bio: "",
      booksCount: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      privacy: {
        showLibrary: true,
        showProfile: true,
      },
    };

    // Add to mock users
    mockUsers.push({ email: newUser.email, password, user: newUser });
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
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
