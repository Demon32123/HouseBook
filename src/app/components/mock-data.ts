export type ReadingStatus = "unread" | "reading" | "read";

export interface StoreLink {
  name: string;
  url: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  cover: string;
  description: string;
  pages: number;
  year: number;
  genre: string;
  readingStatus: ReadingStatus;
  storeLinks: StoreLink[];
  isLent: boolean;
  lentTo?: string;
  lentDate?: string;
  isBorrowed: boolean;
  borrowedFrom?: string;
  borrowedDate?: string;
  addedDate: string;
  rating?: number;
  ownerId: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  booksCount: number;
  bio: string;
}

export const currentUser: User = {
  id: "user-1",
  name: "Алексей Петров",
  email: "alexey@example.com",
  avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE0MTUxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  booksCount: 12,
  bio: "Люблю читать классику и научную фантастику",
};

export const communityUsers: User[] = [
  {
    id: "user-2",
    name: "Мария Иванова",
    avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTQwNjEzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    booksCount: 28,
    bio: "Книжный червь. Обожаю детективы и триллеры.",
  },
  {
    id: "user-3",
    name: "Дмитрий Козлов",
    avatar: "https://images.unsplash.com/photo-1762708590808-c453c0e4fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGNhc3VhbCUyMHNtaWxpbmd8ZW58MXx8fHwxNzcxNTA5MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    booksCount: 15,
    bio: "Философия, история и нон-фикшн — мой мир.",
  },
  {
    id: "user-4",
    name: "Елена Смирнова",
    avatar: "https://images.unsplash.com/photo-1748344386932-f0b9c7b925e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTQzNjg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    booksCount: 42,
    bio: "Собираю коллекцию фэнтези и фантастики с 2010 года.",
  },
];

export const myBooks: Book[] = [
  {
    id: "book-1",
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    isbn: "978-5-17-090221-4",
    cover: "https://images.unsplash.com/photo-1762113246655-05f2cb669f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB2aW50YWdlJTIwYm9vayUyMGxlYXRoZXJ8ZW58MXx8fHwxNzcxNTE2MDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Роман о визите дьявола в Москву. Одно из наиболее значительных произведений русской литературы XX века. Сочетает в себе фантастику, сатиру, философию и любовную линию.",
    pages: 480,
    year: 1967,
    genre: "Классика",
    readingStatus: "read",
    storeLinks: [
      { name: "Лабиринт", url: "https://www.labirint.ru" },
      { name: "Ozon", url: "https://www.ozon.ru" },
    ],
    isLent: true,
    lentTo: "Мария Иванова",
    lentDate: "2026-01-15",
    isBorrowed: false,
    addedDate: "2025-03-10",
    rating: 5,
    ownerId: "user-1",
  },
  {
    id: "book-2",
    title: "1984",
    author: "Джордж Оруэлл",
    isbn: "978-5-17-080063-3",
    cover: "https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcGFwZXJiYWNrJTIwZmljdGlvbnxlbnwxfHx8fDE3NzE1MTYwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Антиутопический роман-предупреждение о тоталитарном обществе. Одно из самых известных произведений в жанре антиутопии.",
    pages: 320,
    year: 1949,
    genre: "Антиутопия",
    readingStatus: "read",
    storeLinks: [
      { name: "Лабиринт", url: "https://www.labirint.ru" },
    ],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-05-20",
    rating: 5,
    ownerId: "user-1",
  },
  {
    id: "book-3",
    title: "Дюна",
    author: "Фрэнк Герберт",
    isbn: "978-5-17-118402-2",
    cover: "https://images.unsplash.com/photo-1633680842723-2a0d770f2b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBzcGFjZXxlbnwxfHx8fDE3NzE0ODQwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Научно-фантастический роман о пустынной планете Арракис и борьбе за контроль над самым ценным ресурсом во Вселенной.",
    pages: 688,
    year: 1965,
    genre: "Научная фантастика",
    readingStatus: "reading",
    storeLinks: [
      { name: "Ozon", url: "https://www.ozon.ru" },
      { name: "Book24", url: "https://book24.ru" },
    ],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-09-01",
    rating: 4,
    ownerId: "user-1",
  },
  {
    id: "book-4",
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    isbn: "978-5-389-04926-5",
    cover: "https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMG5vdmVsJTIwYXJ0JTIwY292ZXJ8ZW58MXx8fHwxNzcxNTE2MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Роман о бедном студенте Родионе Раскольникове, совершившем преступление и переживающем нравственные муки.",
    pages: 672,
    year: 1866,
    genre: "Классика",
    readingStatus: "read",
    storeLinks: [
      { name: "Лабиринт", url: "https://www.labirint.ru" },
    ],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-01-15",
    rating: 5,
    ownerId: "user-1",
  },
  {
    id: "book-5",
    title: "Sapiens: Краткая история человечества",
    author: "Юваль Ной Харари",
    isbn: "978-5-906837-63-2",
    cover: "https://images.unsplash.com/photo-1615288065191-8c30c5223913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9vayUyMGFuY2llbnQlMjBtYXB8ZW58MXx8fHwxNzcxNTE2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Увлекательный рассказ о том, как вид Homo sapiens стал доминирующим на планете и как это изменило мир вокруг нас.",
    pages: 520,
    year: 2011,
    genre: "Нон-фикшн",
    readingStatus: "unread",
    storeLinks: [
      { name: "Ozon", url: "https://www.ozon.ru" },
    ],
    isLent: false,
    isBorrowed: true,
    borrowedFrom: "Дмитрий Козлов",
    borrowedDate: "2026-02-01",
    addedDate: "2026-02-01",
    ownerId: "user-3",
  },
  {
    id: "book-6",
    title: "Так говорил Заратустра",
    author: "Фридрих Ницше",
    isbn: "978-5-17-077543-6",
    cover: "https://images.unsplash.com/photo-1771419991322-84b3fc368aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGlsb3NvcGh5JTIwYm9vayUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcxNTE2MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Философский роман в стихах, представляющий идеи сверхчеловека, вечного возвращения и воли к власти.",
    pages: 352,
    year: 1885,
    genre: "Философия",
    readingStatus: "reading",
    storeLinks: [],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-11-20",
    rating: 4,
    ownerId: "user-1",
  },
  {
    id: "book-7",
    title: "Война и мир",
    author: "Лев Толстой",
    isbn: "978-5-17-090007-4",
    cover: "https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFjayUyMGJvb2tzJTIwcmVhZGluZ3xlbnwxfHx8fDE3NzE1MTYwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Эпический роман о русском обществе в эпоху наполеоновских войн.",
    pages: 1225,
    year: 1869,
    genre: "Классика",
    readingStatus: "unread",
    storeLinks: [
      { name: "Лабиринт", url: "https://www.labirint.ru" },
      { name: "Ozon", url: "https://www.ozon.ru" },
    ],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-06-10",
    ownerId: "user-1",
  },
  {
    id: "book-8",
    title: "Маленький принц",
    author: "Антуан де Сент-Экзюпери",
    isbn: "978-5-04-098320-0",
    cover: "https://images.unsplash.com/photo-1697787963002-c4e443c6dabc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZWFkaW5nJTIwY296eXxlbnwxfHx8fDE3NzE1MTYwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Философская сказка о маленьком мальчике с далёкой планеты, который путешествует по Вселенной в поисках друзей.",
    pages: 96,
    year: 1943,
    genre: "Классика",
    readingStatus: "read",
    storeLinks: [
      { name: "Book24", url: "https://book24.ru" },
    ],
    isLent: true,
    lentTo: "Елена Смирнова",
    lentDate: "2026-02-10",
    isBorrowed: false,
    addedDate: "2024-12-25",
    rating: 5,
    ownerId: "user-1",
  },
];

export const communityBooks: Book[] = [
  {
    id: "book-c1",
    title: "Гарри Поттер и философский камень",
    author: "Дж. К. Роулинг",
    isbn: "978-5-389-07435-9",
    cover: "https://images.unsplash.com/photo-1747655758711-bb8a888cb022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hlbGYlMjBsaWJyYXJ5JTIwd29vZGVufGVufDF8fHx8MTc3MTUxNjA1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Первый роман о юном волшебнике Гарри Поттере.",
    pages: 432,
    year: 1997,
    genre: "Фэнтези",
    readingStatus: "read",
    storeLinks: [],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-01-05",
    rating: 5,
    ownerId: "user-2",
  },
  {
    id: "book-c2",
    title: "Убить пересмешника",
    author: "Харпер Ли",
    isbn: "978-5-17-080508-9",
    cover: "https://images.unsplash.com/photo-1762113246655-05f2cb669f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB2aW50YWdlJTIwYm9vayUyMGxlYXRoZXJ8ZW58MXx8fHwxNzcxNTE2MDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Роман о расовой несправедливости на юге США глазами маленькой девочки.",
    pages: 320,
    year: 1960,
    genre: "Классика",
    readingStatus: "read",
    storeLinks: [],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-04-12",
    rating: 5,
    ownerId: "user-4",
  },
  {
    id: "book-c3",
    title: "Краткая история времени",
    author: "Стивен Хокинг",
    isbn: "978-5-17-094613-2",
    cover: "https://images.unsplash.com/photo-1633680842723-2a0d770f2b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBzcGFjZXxlbnwxfHx8fDE3NzE0ODQwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Научно-популярная книга о космологии, большом взрыве и чёрных дырах.",
    pages: 256,
    year: 1988,
    genre: "Наука",
    readingStatus: "read",
    storeLinks: [],
    isLent: false,
    isBorrowed: false,
    addedDate: "2025-07-20",
    rating: 4,
    ownerId: "user-3",
  },
];

export const genres = [
  "Все",
  "Классика",
  "Антиутопия",
  "Научная фантастика",
  "Фэнтези",
  "Нон-фикшн",
  "Философия",
  "Наука",
  "Детектив",
  "Триллер",
];

export const borrowRequests = [
  {
    id: "req-1",
    bookId: "book-2",
    bookTitle: "1984",
    requesterId: "user-3",
    requesterName: "Дмитрий Козлов",
    requesterAvatar: "https://images.unsplash.com/photo-1762708590808-c453c0e4fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGNhc3VhbCUyMHNtaWxpbmd8ZW58MXx8fHwxNzcxNTA5MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "2026-02-18",
    status: "pending" as const,
  },
  {
    id: "req-2",
    bookId: "book-4",
    bookTitle: "Преступление и наказание",
    requesterId: "user-4",
    requesterName: "Елена Смирнова",
    requesterAvatar: "https://images.unsplash.com/photo-1748344386932-f0b9c7b925e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTQzNjg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "2026-02-17",
    status: "pending" as const,
  },
];