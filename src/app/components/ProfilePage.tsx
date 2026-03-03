import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Camera,
  Save,
  User,
  Mail,
  Shield,
  LogOut,
  BookOpen,
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import type { AuthUser } from "./AuthContext";

type Tab = "profile" | "privacy" | "security";

export function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Профиль", icon: User },
    { id: "privacy", label: "Приватность", icon: Shield },
    { id: "security", label: "Безопасность", icon: Lock },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад
      </button>

      <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
        Настройки профиля
      </h1>
      <p className="text-muted-foreground mt-1 mb-6" style={{ fontSize: "14px" }}>
        Управляйте своим аккаунтом и настройками
      </p>

      {/* Success toast */}
      {saved && (
        <div className="fixed top-6 right-6 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span style={{ fontSize: "14px", fontWeight: 500 }}>Изменения сохранены</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs sidebar */}
        <div className="lg:w-[220px] shrink-0">
          <div className="bg-white border border-border rounded-xl p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}

            <div className="h-px bg-border my-1 hidden lg:block" />

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors whitespace-nowrap"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Выйти
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <ProfileTab user={user} updateProfile={updateProfile} onSave={showSaved} />
          )}
          {activeTab === "privacy" && (
            <PrivacyTab user={user} updateProfile={updateProfile} onSave={showSaved} />
          )}
          {activeTab === "security" && <SecurityTab onSave={showSaved} />}
        </div>
      </div>
    </div>
  );
}

/* ===================== PROFILE TAB ===================== */

function ProfileTab({
  user,
  updateProfile,
  onSave,
}: {
  user: AuthUser;
  updateProfile: (u: Partial<AuthUser>) => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);

  const handleSave = () => {
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      avatar: avatarUrl,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="bg-white border border-border rounded-xl p-5">
        <h3 className="text-foreground mb-4" style={{ fontSize: "16px", fontWeight: 600 }}>
          Фото профиля
        </h3>
        <div className="flex items-center gap-5">
          <div className="relative group">
            <img
              src={avatarUrl}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="url"
              placeholder="URL фото профиля..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              style={{ fontSize: "13px" }}
            />
            <p className="text-muted-foreground mt-1.5" style={{ fontSize: "12px" }}>
              Вставьте URL изображения для аватара
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white border border-border rounded-xl p-5">
        <h3 className="text-foreground mb-4" style={{ fontSize: "16px", fontWeight: 600 }}>
          Личная информация
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              className="text-foreground block mb-1.5"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              О себе
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Расскажите о себе и своих читательских предпочтениях..."
              rows={3}
              className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
              style={{ fontSize: "14px" }}
            />
          </div>

          {/* Stats (readonly) */}
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span style={{ fontSize: "13px" }}>{user.booksCount} книг</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span style={{ fontSize: "13px" }}>
                С{" "}
                {new Date(user.joinedDate).toLocaleDateString("ru-RU", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <Save className="w-4 h-4" />
          Сохранить
        </button>
      </div>
    </div>
  );
}

/* ===================== PRIVACY TAB ===================== */

function PrivacyTab({
  user,
  updateProfile,
  onSave,
}: {
  user: AuthUser;
  updateProfile: (u: Partial<AuthUser>) => void;
  onSave: () => void;
}) {
  const [settings, setSettings] = useState(user.privacy);

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    updateProfile({ privacy: settings });
    onSave();
  };

  const items = [
    {
      key: "showLibrary" as const,
      title: "Показывать мою библиотеку",
      desc: "Другие пользователи смогут видеть ваши книги в сообществе",
    },
    {
      key: "showProfile" as const,
      title: "Публичный профиль",
      desc: "Ваш профиль будет виден в разделе сообщества",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-xl p-5">
        <h3 className="text-foreground mb-1" style={{ fontSize: "16px", fontWeight: 600 }}>
          Приватность
        </h3>
        <p className="text-muted-foreground mb-5" style={{ fontSize: "13px" }}>
          Контролируйте, что видят другие пользователи
        </p>

        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-3.5 border-b border-border last:border-0"
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
                  {item.title}
                </p>
                <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
                  {item.desc}
                </p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                  settings[item.key] ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    settings[item.key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
            Ваши данные в безопасности
          </p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
            Мы не передаём ваши персональные данные третьим лицам. Все настройки приватности
            применяются мгновенно.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <Save className="w-4 h-4" />
          Сохранить
        </button>
      </div>
    </div>
  );
}

/* ===================== SECURITY TAB ===================== */

function SecurityTab({ onSave }: { onSave: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    setError("");

    if (currentPassword.length < 6) {
      setError("Введите текущий пароль");
      return;
    }
    if (newPassword.length < 6) {
      setError("Новый пароль должен быть не менее 6 символов");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    // Mock password change
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 600 }}>
            Смена пароля
          </h3>
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-muted-foreground mb-5" style={{ fontSize: "13px" }}>
          Обновите пароль для защиты аккаунта
        </p>

        {error && (
          <div
            className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-4 py-3 mb-4"
            style={{ fontSize: "13px" }}
          >
            {error}
          </div>
        )}

        <div className="space-y-4 max-w-md">
          <div>
            <label
              className="text-foreground block mb-1.5"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              Текущий пароль
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Введите текущий пароль"
              className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              style={{ fontSize: "14px" }}
            />
          </div>

          <div>
            <label
              className="text-foreground block mb-1.5"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              Новый пароль
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              style={{ fontSize: "14px" }}
            />
          </div>

          <div>
            <label
              className="text-foreground block mb-1.5"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              Повторите новый пароль
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              style={{ fontSize: "14px" }}
            />
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white border border-destructive/20 rounded-xl p-5">
        <h3 className="text-destructive mb-1" style={{ fontSize: "16px", fontWeight: 600 }}>
          Опасная зона
        </h3>
        <p className="text-muted-foreground mb-4" style={{ fontSize: "13px" }}>
          Удаление аккаунта необратимо. Все данные будут потеряны.
        </p>
        <button
          className="border border-destructive/30 text-destructive px-4 py-2 rounded-lg hover:bg-destructive/10 transition-colors"
          style={{ fontSize: "13px", fontWeight: 500 }}
        >
          Удалить аккаунт
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleChangePassword}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <Save className="w-4 h-4" />
          Сменить пароль
        </button>
      </div>
    </div>
  );
}
