import { useNavigate } from "react-router";
import { BookOpen, Clock, CheckCircle2, ArrowLeftRight } from "lucide-react";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO";

const statusConfig = {
  unread: { label: "Не прочитана", icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
  reading: { label: "Читаю", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
  read: { label: "Прочитана", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
};

interface BookCardProps {
  book: LibraryBookDTO;
  showOwner?: boolean;
  showStatus?: boolean
}

export function BookCard({ book, showOwner, showStatus }: BookCardProps) {
  const navigate = useNavigate();
  const status = statusConfig[book.readingStatus];
  const StatusIcon = status.icon;

  return (
    <div
      className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
      onClick={() => navigate(`/book/${book.bookId}`)}
    >
      {/* Cover */}
      <div className="aspect-[3/4] overflow-hidden relative bg-muted">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status badge */}
        { showStatus && <div className={`absolute top-2.5 left-2.5 ${status.bg} ${status.color} px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span style={{ fontSize: "11px", fontWeight: 600 }}>{status.label}</span>
        </div> }
        {/* Lending badge */}
        {(book.isLent) && (
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
          {book.authors.map( a => a )}
        </p>
      </div>
    </div>
  );
}

