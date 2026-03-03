import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  BookOpen,
  User,
  Inbox,
} from "lucide-react";
import { myBooks, borrowRequests } from "./mock-data";

type Tab = "lent" | "borrowed" | "requests";

export function LendingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("lent");

  const lentBooks = myBooks.filter((b) => b.isLent);
  const borrowedBooks = myBooks.filter((b) => b.isBorrowed);

  const tabs = [
    { id: "lent" as const, label: "Одолжены мной", count: lentBooks.length, icon: ArrowUpRight },
    { id: "borrowed" as const, label: "Взяты у других", count: borrowedBooks.length, icon: ArrowDownLeft },
    { id: "requests" as const, label: "Запросы", count: borrowRequests.length, icon: Inbox },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
        Одолженные книги
      </h1>
      <p className="text-muted-foreground mt-1 mb-6" style={{ fontSize: "14px" }}>
        Отслеживайте книги, которые вы одолжили или взяли у друзей
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-muted-foreground"
                }`}
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lent books */}
      {activeTab === "lent" && (
        <div>
          {lentBooks.length === 0 ? (
            <EmptyState
              icon={ArrowUpRight}
              title="Нет одолженных книг"
              description="Вы пока не одолжили ни одной книги"
            />
          ) : (
            <div className="space-y-3">
              {lentBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-14 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: "13px" }}>
                      {book.author}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User className="w-3.5 h-3.5" />
                        <span style={{ fontSize: "12px" }}>Кому: {book.lentTo}</span>
                      </div>
                      {book.lentDate && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span style={{ fontSize: "12px" }}>
                            {new Date(book.lentDate).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 hidden sm:block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                      style={{ fontSize: "13px", fontWeight: 500 }}
                    >
                      Вернули
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Borrowed books */}
      {activeTab === "borrowed" && (
        <div>
          {borrowedBooks.length === 0 ? (
            <EmptyState
              icon={ArrowDownLeft}
              title="Нет взятых книг"
              description="Вы пока не взяли книг у других людей"
            />
          ) : (
            <div className="space-y-3">
              {borrowedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-14 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: "13px" }}>
                      {book.author}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User className="w-3.5 h-3.5" />
                        <span style={{ fontSize: "12px" }}>
                          От: {book.borrowedFrom}
                        </span>
                      </div>
                      {book.borrowedDate && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span style={{ fontSize: "12px" }}>
                            {new Date(book.borrowedDate).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 hidden sm:block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                      style={{ fontSize: "13px", fontWeight: 500 }}
                    >
                      Вернуть
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Requests */}
      {activeTab === "requests" && (
        <div>
          {borrowRequests.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Нет запросов"
              description="Пока никто не запросил ваши книги"
            />
          ) : (
            <div className="space-y-3">
              {borrowRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-border rounded-xl p-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={req.requesterAvatar}
                      alt={req.requesterName}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-foreground"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {req.requesterName}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "13px" }}>
                          просит книгу
                        </span>
                      </div>
                      <p className="text-foreground mt-1" style={{ fontSize: "14px", fontWeight: 500 }}>
                        «{req.bookTitle}»
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span style={{ fontSize: "12px" }}>
                          {new Date(req.date).toLocaleDateString("ru-RU")}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>
                          <CheckCircle2 className="w-4 h-4" />
                          Одобрить
                        </button>
                        <button className="bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>
                          <XCircle className="w-4 h-4" />
                          Отклонить
                        </button>
                      </div>
                    </div>
                    <div
                      className={`shrink-0 px-2.5 py-1 rounded-full ${
                        req.status === "pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                      style={{ fontSize: "12px", fontWeight: 500 }}
                    >
                      {req.status === "pending" ? "Ожидает" : "Одобрено"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof BookOpen;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 600 }}>
        {title}
      </h3>
      <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
        {description}
      </p>
    </div>
  );
}
