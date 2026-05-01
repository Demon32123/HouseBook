import { apiClient } from "../api/apiClient";
import { ReadingStatus } from "../components/mock-data";
import { BookDTO } from "../dtos/BookDTO";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO";

export const booksService = {
    async getLibrary() : Promise<Array<LibraryBookDTO>> {
        return (await apiClient({ path: "books/library", params: { method: "GET" }  })).json()
    },
    async getBook(isbn: string): Promise<BookDTO> {
        return (await apiClient({ path: `books/lookup?isbn=${isbn}`, params: { method: "GET" }  })).json()
    },
    async changeBookState(bookId: number, body: object) {
        return (await apiClient({ path: `books/library/${bookId}`, params: { method: "PATCH", body: JSON.stringify(body) }  })).json()
    },
    async addBook(book: {
        title: string;
        author: string;
        authors: Array<string>;
        isbn: string;
        description: string;
        coverUrl: string;
        pagesCount: string;
        year: string;
        genre: string;
        readingStatus: ReadingStatus;
      }) : Promise<LibraryBookDTO> {
        console.log(JSON.stringify(book)) 
        return (await apiClient({ path: `books/library/manual`, params: { method: "POST", body: JSON.stringify(book) }  })).json()
    }
}