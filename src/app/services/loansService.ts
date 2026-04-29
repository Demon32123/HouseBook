import { apiClient } from "../api/apiClient";
import { LoanResultDTO } from "../dtos/LoanResultDTO";
import { BookRequestDTO } from "../dtos/BookRequestDTO";
import { NewLoanDTO } from "../dtos/NewLoanDTO";
import { ChangeLoanDTO } from "../dtos/ChangeLoanDTO";

export const loansService = {
    async addLoan(loan: NewLoanDTO) {
        return await (await apiClient({ path: "loans", params: { method: "POST", body: JSON.stringify(loan) } })).json()
    },
    async changeLoanState(loanId: number, loan: ChangeLoanDTO) {
        return await (await apiClient({path: `loans/${loanId}/return`, params: { method: "PATCH", body: JSON.stringify(loan) } })).json()
    },
    async getLoanRequestsIncoming() {
        return await (await apiClient({ path: "loan-requests/incoming", params: { method: "GET" } })).json()
    },
    async getLoanRequestsOutgoing() {
        return await (await apiClient({ path: "loan-requests/outgoing", params: { method: "GET" } })).json()
    },
    async getOutgoingLoans() : Promise<Array<LoanResultDTO>> {
        return await (await apiClient({ path: "loans/outgoing", params: { method: "GET" } })).json()
    },
    async getIncomingLoans() : Promise<Array<LoanResultDTO>> {
        return await (await apiClient({ path: "loans/incoming", params: { method: "GET" } })).json()
    },
    async returnLoan(loanId: number) {
        return await (await apiClient({ path: `loans/${loanId}/return`, params: { method: "PATCH" } })).json()
    },
    async createBorrow(loanRequest: BookRequestDTO) {
        await ((await apiClient({path: "loan-requests", params: { method: "POST", body: JSON.stringify(loanRequest) }})).json())
    },
    async approveRequest(requestId: number, dueAt: string) {
        return (await apiClient({path: `loan-requests/${requestId}/approve`, params: { method: "PATCH", body: JSON.stringify({ dueAt }) }})).json()
    },
    async rejectRequest(requestId: number) {
        return (await apiClient({ path: `loan-requests/${requestId}/reject`, params: { method: "PATCH" } }))
    }
}