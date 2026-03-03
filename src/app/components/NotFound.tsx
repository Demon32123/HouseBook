import { useNavigate } from "react-router";
import { BookOpen } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5">
        <BookOpen className="w-9 h-9 text-primary" />
      </div>
      <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
        Страница не найдена
      </h1>
      <p className="text-muted-foreground mt-2" style={{ fontSize: "14px" }}>
        Запрашиваемая страница не существует
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        На главную
      </button>
    </div>
  );
}
