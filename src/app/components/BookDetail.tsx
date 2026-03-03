import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  ExternalLink,
  ArrowLeftRight,
  Star,
  Edit3,
  Trash2,
  Share2,
  Calendar,
  Hash,
  BookOpenCheck,
  Tag,
  MessageSquare,
} from "lucide-react";
import { myBooks, communityBooks, communityUsers, currentUser } from "./mock-data";
import type { Book, ReadingStatus } from "./mock-data";

const statusConfig = {
  unread: {
    label: "Не прочитана",
    icon: Clock,
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
  reading: {
    label: "Читаю",
    icon: BookOpen,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  read: {
    label: "Прочитана",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allBooks = [...myBooks, ...communityBooks];
  const book = allBooks.find((b) => b.id === id);
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>(
    book?.readingStatus || "unread"
  );
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [borrowSent, setBorrowSent] = useState(false);

  const isOwner = book?.ownerId === currentUser.id;
  const ownerUser = communityUsers.find((u) => u.id === book?.ownerId);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-foreground" style={{ fontSize: "18px", fontWeight: 600 }}>
          Книга не найдена
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary hover:underline"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  const status = statusConfig[readingStatus];
  const StatusIcon = status.icon;

  const handleBorrowRequest = () => {
    setBorrowSent(true);
    setShowBorrowModal(false);
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад
      </button>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Cover */}
        <div className="shrink-0">
          <div className="w-full max-w-[240px] mx-auto lg:mx-0 lg:w-[240px]">
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-foreground"
                style={{ fontSize: "24px", fontWeight: 700, lineHeight: "1.3" }}
              >
                {book.title}
              </h1>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "16px" }}>
                {book.author}
              </p>
            </div>
            {isOwner && (
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => navigate(`/edit/${book.id}`)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <Edit3 className="w-4.5 h-4.5" />
                </button>
              </div>
            )}
          </div>

          {/* Rating */}
          {book.rating && (
            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < book.rating! ? "text-amber-400 fill-amber-400" : "text-gray-200"
                  }`}
                />
              ))}
              <span className="text-muted-foreground ml-1" style={{ fontSize: "14px" }}>
                {book.rating}/5
              </span>
            </div>
          )}

          {/* Status & Lending */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div
              className={`${status.bg} ${status.color} px-3 py-1.5 rounded-full flex items-center gap-1.5`}
            >
              <StatusIcon className="w-4 h-4" />
              <span style={{ fontSize: "13px", fontWeight: 600 }}>{status.label}</span>
            </div>
            {book.isLent && (
              <div className="bg-violet-50 text-violet-600 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>
                  Одолжена: {book.lentTo}
                </span>
              </div>
            )}
            {book.isBorrowed && (
              <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>
                  Взята у: {book.borrowedFrom}
                </span>
              </div>
            )}
          </div>

          {/* Change status if owner */}
          {isOwner && (
            <div className="mt-4">
              <label
                className="text-foreground block mb-2"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Изменить статус
              </label>
              <div className="flex gap-2">
                {(["unread", "reading", "read"] as ReadingStatus[]).map((s) => {
                  const cfg = statusConfig[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setReadingStatus(s)}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        readingStatus === s
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-gray-300"
                      }`}
                      style={{ fontSize: "13px", fontWeight: 500 }}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Request to borrow (if not owner) */}
          {!isOwner && !book.isLent && (
            <div className="mt-4">
              {borrowSent ? (
                <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    Запрос отправлен владельцу
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setShowBorrowModal(true)}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Попросить взаймы
                </button>
              )}
            </div>
          )}

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-foreground mb-2" style={{ fontSize: "15px", fontWeight: 600 }}>
              Описание
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: "1.6" }}>
              {book.description}
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <DetailItem icon={BookOpenCheck} label="Страниц" value={String(book.pages)} />
            <DetailItem icon={Calendar} label="Год" value={String(book.year)} />
            <DetailItem icon={Tag} label="Жанр" value={book.genre} />
            <DetailItem icon={Hash} label="ISBN" value={book.isbn} />
            <DetailItem
              icon={Calendar}
              label="Добавлена"
              value={new Date(book.addedDate).toLocaleDateString("ru-RU")}
            />
          </div>

          {/* Store links */}
          {book.storeLinks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-foreground mb-2" style={{ fontSize: "15px", fontWeight: 600 }}>
                Где купить
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.storeLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-border rounded-lg text-foreground hover:border-primary hover:text-primary transition-colors"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Owner info (if community book) */}
          {!isOwner && ownerUser && (
            <div className="mt-6 bg-muted/50 rounded-xl p-4">
              <h3 className="text-foreground mb-2" style={{ fontSize: "15px", fontWeight: 600 }}>
                Владелец
              </h3>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate(`/community/${ownerUser.id}`)}
              >
                <img
                  src={ownerUser.avatar}
                  alt={ownerUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
                    {ownerUser.name}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                    {ownerUser.booksCount} книг в библиотеке
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-foreground" style={{ fontSize: "18px", fontWeight: 600 }}>
              Запросить книгу
            </h3>
            <p className="text-muted-foreground mt-2" style={{ fontSize: "14px" }}>
              Отправить запрос владельцу книги «{book.title}» на временное заимствование?
            </p>
            <textarea
              placeholder="Добавьте сообщение (необязательно)..."
              className="w-full mt-4 p-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={3}
              style={{ fontSize: "14px" }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowBorrowModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Отмена
              </button>
              <button
                onClick={handleBorrowRequest}
                className="flex-1 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
          {label}
        </p>
        <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
          {value}
        </p>
      </div>
    </div>
  );
}
