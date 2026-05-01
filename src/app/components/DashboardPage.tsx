import { useNavigate } from "react-router";
import {
  BookOpen,
  TrendingUp,
  ArrowLeftRight,
  Users,
  ChevronRight,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { myBooks, borrowRequests, communityUsers } from "./mock-data";
import { BookCard } from "./BookCard";
import { useAuth } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { usersService } from "../services/usersService.ts"
import { ComminutyAccountDTO } from "../dtos/ComminutyAccountDTO.ts";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO.ts";
import { booksService } from "../services/booksService.ts";
import { CommLibContext } from "../contexts/CommLibContext.tsx";
import { loansService } from "../services/loansService.ts";
import { LoanResultDTO } from "../dtos/LoanResultDTO.ts";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserBooks = myBooks.filter((book) => book.ownerId === user?.id);
  const [library, setLibrary] = useState<Array<LibraryBookDTO>>();
  const [borrowedBooks, setBorrowed] = useState<Array<LoanResultDTO>>()
  const { community } = useContext(CommLibContext);

  useEffect( () => {
    if(!community.val) {
      community.get()
    }
    loansService.getOutgoingLoans().then(answ => {setBorrowed(answ); console.log(answ)})
    booksService.getLibrary().then( answ => {
      setLibrary(answ); 
    return answ})
  }, [] )

  const recentBooks = [...myBooks]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, 4);

  const currentlyReading = currentUserBooks.filter((b) => b.readingStatus === "reading");

  const myRequests = borrowRequests.filter(
    (req) => currentUserBooks.some((b) => b.id === req.bookId) || req.requesterId === user?.id
  );

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
          {user ? `Привет, ${user.name.split(" ")[0]}!` : "Добро пожаловать в HouseBook"}
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
          Управляйте вашей домашней библиотекой
        </p>
      </div>

      {/* Stats */}
      {library && borrowedBooks && <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          icon={BookOpen}
          label="Всего книг"
          value={library.length}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={CheckCircle2}
          label="Прочитано"
          value={library.filter(b => b.readingStatus === "read").length}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={Clock}
          label="Читаю сейчас"
          value={library.filter(b => b.readingStatus === "reading").length}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={ArrowLeftRight}
          label="Одолжено"
          value={borrowedBooks.length}
          color="bg-violet-50 text-violet-600"
        />
      </div>}

      {/* Currently reading */}
      {currentlyReading.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground" style={{ fontSize: "18px", fontWeight: 600 }}>
              Читаю сейчас
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentlyReading.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-border p-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground truncate" style={{ fontSize: "15px", fontWeight: 600 }}>
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: "13px" }}>
                    {book.author}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
                    </div>
                    <span className="text-muted-foreground shrink-0" style={{ fontSize: "12px" }}>
                      45%
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
                    {book.pages} стр. · {book.genre}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent books + Borrow requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent books */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground" style={{ fontSize: "18px", fontWeight: 600 }}>
              Недавно добавленные
            </h2>
            <button
              onClick={() => navigate("/library")}
              className="text-primary flex items-center gap-1 hover:underline"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Все книги
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          { library ? <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {library.slice(0, 4).map((book) => (
              <BookCard owner={Number(user?.id)} showStatus={true} key={book.bookId} book={book} />
            ))}
          </div> : null }
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Borrow requests */}
          {myRequests.length > 0 && (
            <div className="bg-white rounded-xl border border-border p-4">
              <h3 className="text-foreground mb-3" style={{ fontSize: "15px", fontWeight: 600 }}>
                Запросы на книги
              </h3>
              <div className="space-y-3">
                {myRequests.map((req) => (
                  <div key={req.id} className="flex items-start gap-3">
                    <img
                      src={req.requesterAvatar}
                      alt={req.requesterName}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate" style={{ fontSize: "13px", fontWeight: 500 }}>
                        {req.requesterName}
                      </p>
                      <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>
                        хочет «{req.bookTitle}»
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "12px", fontWeight: 500 }}>
                          Одобрить
                        </button>
                        <button className="bg-muted text-muted-foreground px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors" style={{ fontSize: "12px", fontWeight: 500 }}>
                          Отклонить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community */}
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                Сообщество
              </h3>
              <button
                onClick={() => navigate("/community")}
                className="text-primary flex items-center gap-1 hover:underline"
                style={{ fontSize: "12px", fontWeight: 500 }}
              >
                Все
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            { community.val ? <div className="space-y-3">
              {community.val.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted rounded-lg p-2 -mx-2 transition-colors"
                  onClick={() => navigate(`/community/${user.id}`)}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate" style={{ fontSize: "13px", fontWeight: 500 }}>
                      {user.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                      {user.booksCount} книг
                    </p>
                  </div>
                </div>
              ))}
            </div> : null}
          </div>

          {/* Quick add */}
          <button
            onClick={() => navigate("/add")}
            className="w-full bg-primary text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Добавить книгу</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
        {value}
      </p>
      <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
        {label}
      </p>
    </div>
  );
}