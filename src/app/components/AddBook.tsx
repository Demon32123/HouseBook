import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Upload,
  Link2,
  Plus,
  Trash2,
  Sparkles,
  Loader2,
  Image,
  X,
} from "lucide-react";
import { myBooks, genres } from "./mock-data";
import type { ReadingStatus, StoreLink } from "./mock-data";
import { booksService } from "../services/booksService";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO";
import { CommLibContext } from "../contexts/CommLibContext";

export function AddBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const existingBook = id ? myBooks.find((b) => b.id === id) : null;
  const isEditing = !!existingBook;

  const [title, setTitle] = useState(existingBook?.title || "");
  const [author, setAuthor] = useState(existingBook?.author || "");
  const [isbn, setIsbn] = useState(existingBook?.isbn || "");
  const [description, setDescription] = useState(existingBook?.description || "");
  const [pages, setPages] = useState(existingBook?.pages?.toString() || "");
  const [year, setYear] = useState(existingBook?.year?.toString() || "");
  const [genre, setGenre] = useState(existingBook?.genre || "");
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>(
    existingBook?.readingStatus || "unread"
  );
  const [storeLinks, setStoreLinks] = useState<StoreLink[]>(
    existingBook?.storeLinks || []
  );
  const [coverUrl, setCoverUrl] = useState(existingBook?.cover || "");
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleScrape = async () => {
    console.log(console.log(scrapeUrl))
    if (!scrapeUrl) return;
    setIsScraping(true);
    let extraInfo;
    extraInfo = await booksService.getBook(scrapeUrl)
    if (!extraInfo.isbn) {
      alert("Book not found")
      setIsScraping(false)
      return
    }  
    setCoverUrl(extraInfo.coverUrl)
    setTitle(extraInfo.title);
    setAuthor(extraInfo.authors[0]);
    setIsbn(extraInfo.isbn);
    setDescription(
      extraInfo.description
    );
    setPages(extraInfo.pagesCount.toString());
    setYear(extraInfo.year.toString());
    setGenre("Классика");
    setIsScraping(false)
  };

  const addStoreLink = () => {
    if (newLinkName && newLinkUrl) {
      setStoreLinks([...storeLinks, { name: newLinkName, url: newLinkUrl }]);
      setNewLinkName("");
      setNewLinkUrl("");
    }
  };

  const removeStoreLink = (index: number) => {
    setStoreLinks(storeLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const book = {
      title,
      author,
      authors: [],
      isbn,
      description,
      coverUrl,
      pagesCount: pages,
      year,
      genre,
      readingStatus,
    }
    console.log(await booksService.addBook(book))
    navigate("/library")
  };

  const statusOptions = [
    { value: "unread" as const, label: "Не прочитана" },
    { value: "reading" as const, label: "Читаю" },
    { value: "read" as const, label: "Прочитана" },
  ];

  const filteredGenres = genres.filter((g) => g !== "Все");

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад
      </button>

      <h1 className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>
        {isEditing ? "Редактировать книгу" : "Добавить книгу"}
      </h1>
      <p className="text-muted-foreground mt-1 mb-6" style={{ fontSize: "14px" }}>
        {isEditing
          ? "Обновите информацию о книге"
          : "Заполните данные вручную или вставьте ссылку для автозаполнения"}
      </p>

      {/* Auto-fill */}
      {!isEditing && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
              Автозаполнение по ссылке
            </h3>
          </div>
          <p className="text-muted-foreground mb-3" style={{ fontSize: "13px" }}>
            Вставьте ссылку на книгу из онлайн-магазина, и мы автоматически заполним данные
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://www.labirint.ru/books/..."
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
                style={{ fontSize: "14px" }}
              />
            </div>
            <button
              onClick={handleScrape}
              disabled={!scrapeUrl || isScraping}
              className="bg-primary text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              {isScraping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Заполнить
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cover */}
        <div>
          <label className="text-foreground block mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
            Обложка
          </label>
          <div className="flex items-start gap-4">
            {coverUrl ? (
              <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-border shrink-0">
                <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCoverUrl("")}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground shrink-0">
                <Image className="w-6 h-6 mb-1" />
                <span style={{ fontSize: "11px" }}>Нет фото</span>
              </div>
            )}
            <div className="flex-1">
              <input
                type="url"
                placeholder="URL обложки..."
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
                style={{ fontSize: "14px" }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
                Вставьте URL изображения обложки книги
              </p>
            </div>
          </div>
        </div>

        {/* Title & Author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Название"
            value={title}
            onChange={setTitle}
            placeholder="Введите название книги"
            required
          />
          <FormField
            label="Автор"
            value={author}
            onChange={setAuthor}
            placeholder="Имя автора"
            required
          />
        </div>

        {/* ISBN & Genre */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="ISBN"
            value={isbn}
            onChange={setIsbn}
            placeholder="978-5-..."
          />
          <div>
            <label className="text-foreground block mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
              Жанр
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
              style={{ fontSize: "14px" }}
            >
              <option value="">Выберите жанр</option>
              {filteredGenres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pages & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Количество страниц"
            value={pages}
            onChange={setPages}
            placeholder="320"
            type="number"
          />
          <FormField
            label="Год издания"
            value={year}
            onChange={setYear}
            placeholder="2024"
            type="number"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-foreground block mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание книги..."
            rows={4}
            className="w-full px-3 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            style={{ fontSize: "14px" }}
          />
        </div>

        {/* Reading status */}
        <div>
          <label className="text-foreground block mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
            Статус чтения
          </label>
          <div className="flex gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setReadingStatus(opt.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  readingStatus === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-gray-300"
                }`}
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Store links */}
        <div>
          <label className="text-foreground block mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
            Ссылки на магазины
          </label>
          {storeLinks.length > 0 && (
            <div className="space-y-2 mb-3">
              {storeLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2"
                >
                  <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
                    {link.name}
                  </span>
                  <span className="text-muted-foreground truncate flex-1" style={{ fontSize: "13px" }}>
                    {link.url}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStoreLink(index)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Название"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
              style={{ fontSize: "14px" }}
            />
            <input
              type="url"
              placeholder="https://..."
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
              style={{ fontSize: "14px" }}
            />
            <button
              type="button"
              onClick={addStoreLink}
              disabled={!newLinkName || !newLinkUrl}
              className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            {isEditing ? "Сохранить" : "Добавить книгу"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-foreground block mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2.5 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
        style={{ fontSize: "14px" }}
      />
    </div>
  );
}
