import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { myBooks, genres } from "./mock-data";
import type { ReadingStatus } from "./mock-data";
import { BookCard } from "./BookCard";
import { useAuth } from "./AuthContext";

export function MyLibrary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const [selectedStatus, setSelectedStatus] = useState<ReadingStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const { user } = useAuth();
  const filteredBooks = useMemo(() => {
    const currentUserBooks = myBooks.filter(b => b.ownerId === user?.id);
    return currentUserBooks.filter((book) => {
      const matchesSearch =
        !search ||
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesGenre =
        selectedGenre === "Все" || book.genre === selectedGenre;
      const matchesStatus =
        selectedStatus === "all" || book.readingStatus === selectedStatus;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [search, selectedGenre, selectedStatus, user?.id]);

  const statusOptions = [
    { value: "all", label: "Все статусы" },
    { value: "unread", label: "Не прочитана" },
    { value: "reading", label: "Читаю" },
    { value: "read", label: "Прочитана" },
  ];

  const activeFilters =
    (selectedGenre !== "Все" ? 1 : 0) + (selectedStatus !== "all" ? 1 : 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
            Моя библиотека
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "14px" }}>
            {filteredBooks.length} книг в коллекции
          </p>
        </div>
        <button
          onClick={() => navigate("/add")}
          className="bg-primary text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors self-start"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <Plus className="w-4 h-4" />
          Добавить книгу
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            style={{ fontSize: "14px" }}
          />
          {search && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              showFilters || activeFilters > 0
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-white border-border text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
            {activeFilters > 0 && (
              <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: "11px", fontWeight: 600 }}>
                {activeFilters}
              </span>
            )}
          </button>
          <div className="flex bg-white border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition-colors ${
                viewMode === "list"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border border-border rounded-xl p-4 mb-4 space-y-4">
          <div>
            <label className="text-foreground mb-2 block" style={{ fontSize: "13px", fontWeight: 600 }}>
              Жанр
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    selectedGenre === genre
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-gray-200"
                  }`}
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-foreground mb-2 block" style={{ fontSize: "13px", fontWeight: 600 }}>
              Статус чтения
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setSelectedStatus(opt.value as ReadingStatus | "all")
                  }
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    selectedStatus === opt.value
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-gray-200"
                  }`}
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {activeFilters > 0 && (
            <button
              onClick={() => {
                setSelectedGenre("Все");
                setSelectedStatus("all");
              }}
              className="text-primary hover:underline"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 600 }}>
            Книги не найдены
          </h3>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} showOwner />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredBooks.map((book) => (
            <ListBookItem key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

function ListBookItem({ book }: { book: (typeof myBooks)[0] }) {
  const navigate = useNavigate();
  const statusColors = {
    unread: "bg-muted text-muted-foreground",
    reading: "bg-amber-50 text-amber-600",
    read: "bg-emerald-50 text-emerald-600",
  };
  const statusLabels = {
    unread: "Не прочитана",
    reading: "Читаю",
    read: "Прочитана",
  };

  return (
    <div
      className="bg-white border border-border rounded-xl p-3 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-12 h-16 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-foreground truncate" style={{ fontSize: "14px", fontWeight: 600 }}>
          {book.title}
        </h3>
        <p className="text-muted-foreground truncate" style={{ fontSize: "13px" }}>
          {book.author}
        </p>
      </div>
      <span
        className={`${statusColors[book.readingStatus]} px-2.5 py-1 rounded-full shrink-0 hidden sm:block`}
        style={{ fontSize: "12px", fontWeight: 500 }}
      >
        {statusLabels[book.readingStatus]}
      </span>
      <span className="text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0 hidden md:block" style={{ fontSize: "12px" }}>
        {book.genre}
      </span>
    </div>
  );
}