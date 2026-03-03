import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Users,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { communityUsers, communityBooks } from "./mock-data";
import { BookCard } from "./BookCard";

export function CommunityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredUsers = communityUsers.filter(
    (u) =>
      !search || u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
        Сообщество
      </h1>
      <p className="text-muted-foreground mt-1 mb-6" style={{ fontSize: "14px" }}>
        Просматривайте библиотеки других людей и берите книги взаймы
      </p>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
          style={{ fontSize: "14px" }}
        />
      </div>

      {/* Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-border rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => navigate(`/community/${user.id}`)}
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h3
                  className="text-foreground group-hover:text-primary transition-colors truncate"
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  {user.name}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span style={{ fontSize: "13px" }}>{user.booksCount} книг</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: "13px", lineHeight: "1.5" }}>
              {user.bio}
            </p>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 600 }}>
            Пользователи не найдены
          </h3>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
            Попробуйте изменить поисковый запрос
          </p>
        </div>
      )}

      {/* Featured community books */}
      <section>
        <h2 className="text-foreground mb-4" style={{ fontSize: "18px", fontWeight: 600 }}>
          Книги сообщества
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {communityBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
