import { apiClient } from "../api/apiClient";
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
    async addBook(isbn: string) : Promise<LibraryBookDTO> {
        console.log(JSON.stringify({ isbn })) 
        return (await apiClient({ path: `books/library`, params: { method: "POST", body: JSON.stringify({ isbn }) }  })).json()
    }
}