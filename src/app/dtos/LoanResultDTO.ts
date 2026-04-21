import { LibraryBookDTO } from "./LibraryBookDTO"

export type LoanResultDTO =
{
    id: number,
    status: string,
    lentAt: string,
    dueAt: string,
    returnedAt: string,
    isOverdue: boolean,
    daysLeft: number,
    dueState: string,
    owner: {
        userId: number,
        name: string
    },
    borrower: {
        userId: number,
        name: string
    },
    book: LibraryBookDTO
}
