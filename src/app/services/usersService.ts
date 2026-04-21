import { apiClient } from "../api/apiClient.ts";
import { AccountDTO } from "../dtos/AccountDTO.ts";
import { ComminutyAccountDTO } from "../dtos/ComminutyAccountDTO.ts";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO.ts";

export const usersService = {
    async getCommunity() : Promise<Array<ComminutyAccountDTO>> {
       return await (await apiClient({ path: "users/community", params: {method: "GET"} })).json()
    },
    async getUserLibrary(userId: number): Promise<Array<LibraryBookDTO>> {
        return await (await apiClient({ path: `users/${userId}/library`, params: { method: "GET" } })).json()
    },
    async changeMyAccount(accountInfo: AccountDTO) : Promise<AccountDTO> {
        return await (await apiClient({ path: `users/me`, params: { method: "PATCH", body: JSON.stringify(accountInfo) } })).json()
    }
}