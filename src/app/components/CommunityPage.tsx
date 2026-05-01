import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Users,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { BookCard } from "./BookCard";
import { ComminutyAccountDTO } from "../dtos/ComminutyAccountDTO";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO";
import { CommLibContext } from "../contexts/CommLibContext";
import { AuthUser, useAuth } from "./AuthContext";

function getLibs(user: AuthUser, communityUsers: Array<ComminutyAccountDTO>, libraries: Array<Array<LibraryBookDTO>>) {
  const communityLibs: Array<{ user: ComminutyAccountDTO, book: LibraryBookDTO }> = []
  console.log(user)
  for(let [idx, lib] of libraries.entries()) {
    if(communityUsers[idx].id.toString() === user.id.toString())
      continue
    lib.forEach( b => communityLibs.push({ user: communityUsers[idx], book: b }) )
  }
  return communityLibs
}

export function CommunityPage() {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { community, libraries } = useContext(CommLibContext)

  useEffect(() => {
    if(!libraries.val) {
      libraries.get()
    }
  }, [])

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
      {community.val ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {community.val.filter(u => u.id.toString() !== user?.id).map((user) => (
            <div
              key={user.id}
              className="bg-white border border-border rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => navigate(`/community/${user.id}`)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatarUrl}
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
        </div> : null}

      {/* Featured community books */}
      <section>
        <h2 className="text-foreground mb-4" style={{ fontSize: "18px", fontWeight: 600 }}>
          Книги сообщества
        </h2>
        {libraries.val && 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {getLibs(user, community.val, libraries.val).map((ownerAndBook) => (
            <BookCard communityPage={true} owner={ownerAndBook.user.id} key={ownerAndBook.book.bookId} book={ownerAndBook.book} />
          ))}
        </div>}
      </section>
    </div>
  );
}
