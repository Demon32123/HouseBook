import { createContext, ReactElement, useState } from "react";
import { usersService } from "../services/usersService";
import { LibraryBookDTO } from "../dtos/LibraryBookDTO";
import { ComminutyAccountDTO } from "../dtos/ComminutyAccountDTO";

export const CommLibContext = createContext<object | null>(null)

export function CommLibContextProvider({ children } : { children: ReactElement }) {
    const [ community, setCommunity ] = useState<Array<ComminutyAccountDTO>>()
    const [ libraries, setLibraries ] = useState<Array<Array<LibraryBookDTO>>>()

    async function getCommunity(): Promise<Array<ComminutyAccountDTO>> {
        let users = await usersService.getCommunity()
        setCommunity(users)
        return users
    }

    async function getLibraries() {
        let libs:Array<Array<LibraryBookDTO>> = []
        let users = community
        if(!users) {
            users = await getCommunity()
        } 
        for(const user of users)
        {
            let lib = await usersService.getUserLibrary(user.id)
            libs.push(lib)
        }
        setLibraries(libs)
    }

    return (
        <CommLibContext.Provider value={{ community: { val: community, get: getCommunity }, libraries: { val: libraries, get: getLibraries } }}>
            { children }
        </CommLibContext.Provider>
    )
}
