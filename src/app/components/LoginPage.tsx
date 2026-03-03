import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "./AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Ошибка входа");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
            Добро пожаловать
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
            Войдите в свой аккаунт HouseBook
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error */}
            {error && (
              <div
                className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-4 py-3"
                style={{ fontSize: "13px" }}
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                className="text-foreground block mb-1.5"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="text-foreground block mb-1.5"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-11 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                  style={{ fontSize: "14px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-primary hover:underline"
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                Забыли пароль?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
              или
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Demo login */}
          <button
            onClick={async () => {
              setEmail("alexey@example.com");
              setPassword("password123");
              setIsLoading(true);
              const result = await login("alexey@example.com", "password123");
              setIsLoading(false);
              if (result.success) navigate("/");
            }}
            className="w-full border border-border py-2.5 rounded-lg text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            <BookOpen className="w-4 h-4 text-primary" />
            Войти с демо-аккаунтом
          </button>
        </div>

        {/* Register link */}
        <p className="text-center mt-5 text-muted-foreground" style={{ fontSize: "14px" }}>
          Нет аккаунта?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline"
            style={{ fontWeight: 600 }}
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
