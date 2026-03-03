import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  BookOpen,
  Library,
  Users,
  ArrowLeftRight,
  Plus,
  Search,
  Menu,
  X,
  Home,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { borrowRequests } from "./mock-data";
import { useAuth } from "./AuthContext";

const navItems = [
  { to: "/", icon: Home, label: "Главная" },
  { to: "/library", icon: Library, label: "Моя библиотека" },
  { to: "/add", icon: Plus, label: "Добавить книгу" },
  { to: "/lending", icon: ArrowLeftRight, label: "Одолженные" },
  { to: "/community", icon: Users, label: "Сообщество" },
];

export function Layout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pendingRequests = borrowRequests.filter((r) => r.status === "pending").length;

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/library?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[264px] bg-white border-r border-border flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-foreground" style={{ fontSize: "18px", fontWeight: 600 }}>HouseBook</span>
          <button
            className="lg:hidden ml-auto text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.label}</span>
              {item.to === "/lending" && pendingRequests > 0 && (
                <span className="ml-auto bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: "11px", fontWeight: 600 }}>
                  {pendingRequests}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User profile section */}
        <div className="border-t border-border px-3 py-3 shrink-0" ref={userMenuRef}>
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-foreground truncate" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {user?.name}
                </p>
                <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>
                  {user?.email}
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setSidebarOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted transition-colors"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  Настройки профиля
                </button>
                <div className="h-px bg-border" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/5 transition-colors"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-border flex items-center px-4 lg:px-6 gap-4 shrink-0">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Найти книгу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                style={{ fontSize: "14px" }}
              />
            </div>
          </form>

          {/* Header avatar (links to profile) */}
          <button
            onClick={() => navigate("/profile")}
            className="hidden sm:block"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-primary/30 transition-colors"
            />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
