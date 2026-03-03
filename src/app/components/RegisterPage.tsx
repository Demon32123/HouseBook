import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  User,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "./AuthContext";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordChecks = [
    { label: "Минимум 6 символов", ok: password.length >= 6 },
    { label: "Содержит букву", ok: /[a-zA-Zа-яА-ЯёЁ]/.test(password) },
    { label: "Содержит цифру", ok: /[0-9]/.test(password) },
  ];

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const allChecksPass = passwordChecks.every((c) => c.ok);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!allChecksPass) {
      setError("Пароль не соответствует требованиям");
      return;
    }
    if (!passwordsMatch) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);
    setIsLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Ошибка регистрации");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4 py-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
            Создать аккаунт
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
            Начните управлять своей библиотекой
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

            {/* Name */}
            <div>
              <label
                className="text-foreground block mb-1.5"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Имя
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

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
                  placeholder="Придумайте пароль"
                  required
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

              {/* Password strength */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordChecks.map((check, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          check.ok ? "text-emerald-500" : "text-muted-foreground/40"
                        }`}
                      />
                      <span
                        className={check.ok ? "text-emerald-600" : "text-muted-foreground"}
                        style={{ fontSize: "12px" }}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                className="text-foreground block mb-1.5"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Повторите пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите пароль"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 bg-muted/50 border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                    confirmPassword.length > 0 && !passwordsMatch
                      ? "border-destructive/50"
                      : "border-border focus:border-primary/40"
                  }`}
                  style={{ fontSize: "14px" }}
                />
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-destructive mt-1" style={{ fontSize: "12px" }}>
                  Пароли не совпадают
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Регистрация...
                </>
              ) : (
                "Зарегистрироваться"
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center mt-5 text-muted-foreground" style={{ fontSize: "14px" }}>
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline"
            style={{ fontWeight: 600 }}
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
