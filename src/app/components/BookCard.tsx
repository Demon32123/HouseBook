import { useNavigate } from "react-router";
import { BookOpen, Clock, CheckCircle2, ArrowLeftRight } from "lucide-react";
import type { Book } from "./mock-data";

const statusConfig = {
  unread: { label: "Не прочитана", icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
  reading: { label: "Читаю", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
  read: { label: "Прочитана", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
};

interface BookCardProps {
  book: Book;
  showOwner?: boolean;
}

export function BookCard({ book, showOwner }: BookCardProps) {
  const navigate = useNavigate();
  const status = statusConfig[book.readingStatus];
  const StatusIcon = status.icon;

  return (
    <div
      className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      {/* Cover */}
      <div className="aspect-[3/4] overflow-hidden relative bg-muted">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status badge */}
        <div className={`absolute top-2.5 left-2.5 ${status.bg} ${status.color} px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span style={{ fontSize: "11px", fontWeight: 600 }}>{status.label}</span>
        </div>
        {/* Lending badge */}
        {(book.isLent || book.isBorrowed) && (
          <div className="absolute top-2.5 right-2.5 bg-primary text-white px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span style={{ fontSize: "11px", fontWeight: 600 }}>
              {book.isLent ? "Одолжена" : "Взята"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-foreground truncate" style={{ fontSize: "14px", fontWeight: 600, lineHeight: "1.3" }}>
          {book.title}
        </h3>
        <p className="text-muted-foreground mt-0.5 truncate" style={{ fontSize: "13px" }}>
          {book.author}
        </p>
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-muted-foreground bg-muted px-2 py-0.5 rounded" style={{ fontSize: "11px", fontWeight: 500 }}>
            {book.genre}
          </span>
          {book.rating && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < book.rating! ? "text-amber-400" : "text-gray-200"}
                  style={{ fontSize: "12px" }}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
        {showOwner && book.isLent && book.lentTo && (
          <p className="text-primary mt-2 truncate" style={{ fontSize: "12px", fontWeight: 500 }}>
            Одолжена: {book.lentTo}
          </p>
        )}
        {showOwner && book.isBorrowed && book.borrowedFrom && (
          <p className="text-primary mt-2 truncate" style={{ fontSize: "12px", fontWeight: 500 }}>
            Взята у: {book.borrowedFrom}
          </p>
        )}
      </div>
    </div>
  );
}
