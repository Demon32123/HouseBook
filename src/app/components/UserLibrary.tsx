import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Users,
  MessageSquare,
} from "lucide-react";
import { communityUsers, communityBooks } from "./mock-data";
import { BookCard } from "./BookCard";
import { useEffect, useState } from "react";
import { ComminutyAccountDTO } from "../dtos/ComminutyAccountDTO";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO";
import { usersService } from "../services/usersService";

async function getData(userId: string, setUser: Function, setLibrary: Function) {
  let users = await usersService.getCommunity()
  let user = users.find(u => u.id.toString() === userId)
  setUser(user)
  let library = await usersService.getUserLibrary(Number(userId))
  setLibrary(library)
}

export function UserLibrary() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<ComminutyAccountDTO>()
  const [library, setLibrary] = useState<Array<LibraryBookDTO>>()

  useEffect(() => {
    getData(userId ?? "", setUser, setLibrary)
  }, [])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <Users className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-foreground" style={{ fontSize: "18px", fontWeight: 600 }}>
          Пользователь не найден
        </h2>
        <button
          onClick={() => navigate("/community")}
          className="mt-4 text-primary hover:underline"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          Вернуться к сообществу
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/community")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Сообщество
      </button>

      {/* User profile */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 700 }}>
              {user.name}
            </h1>
            <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
              {user.bio}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  {user.booksCount} книг
                </span>
              </div>
            </div>
          </div>
          <button
            className="bg-primary text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shrink-0"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            <MessageSquare className="w-4 h-4" />
            Написать
          </button>
        </div>
      </div>

      {/* Books */}
      { library ? <>
        <h2 className="text-foreground mb-4" style={{ fontSize: "18px", fontWeight: 600 }}>
        Библиотека ({library?.length})
      </h2>
      {library.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 600 }}>
            Библиотека пуста
          </h3>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
            Этот пользователь ещё не добавил книг
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {library.map((book) => (
            <BookCard owner={user.id} key={book.bookId} book={book} />
          ))}
        </div>
      )}
      </> : null }
    </div>
  );
}
