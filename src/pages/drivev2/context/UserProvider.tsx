import { createContext, useState, ReactNode, useContext } from "react";
import { Account, Folder } from "../types/types";

export interface UserContextType {
    _id: string;
    name: string;
    email: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
    rootFolderId: string;
    activeFolder: Folder;
    breadCrumb: Folder[];
    accounts: Account[];


    setUserId: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPicture: React.Dispatch<React.SetStateAction<string>>;
    setCreatedAt: React.Dispatch<React.SetStateAction<string>>;
    setUpdatedAt: React.Dispatch<React.SetStateAction<string>>;
    setRootFolderId: React.Dispatch<React.SetStateAction<string>>;
    setActiveFolder: React.Dispatch<React.SetStateAction<Folder>>;
    setBreadCrumb: React.Dispatch<React.SetStateAction<Folder[]>>;
    setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;

    setUser: (user: Partial<UserContextType>) => void;
}

// Default Context Values
const defaultContext: UserContextType = {
    _id: "",
    name: "",
    email: "",
    picture: "",
    createdAt: "",
    updatedAt: "",
    rootFolderId: "",
    breadCrumb: [],
    accounts: [],
    activeFolder: {} as Folder,

    setUserId: () => { },
    setName: () => { },
    setEmail: () => { },
    setPicture: () => { },
    setCreatedAt: () => { },
    setUpdatedAt: () => { },
    setRootFolderId: () => { },
    setActiveFolder: () => { },
    setBreadCrumb: () => { },
    setAccounts: () => { },

    setUser: () => { },
};

// Create Context
const UserContext = createContext<UserContextType>(defaultContext);

// Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [_id, setUserId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [picture, setPicture] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [updatedAt, setUpdatedAt] = useState<string>("");
    const [rootFolderId, setRootFolderId] = useState<string>("");
    const [breadCrumb, setBreadCrumb] = useState<Folder[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [activeFolder, setActiveFolder] = useState<Folder>({} as Folder);

    // Function to update multiple fields at once
    const setUser = (user: Partial<UserContextType>) => {

        console.log("HI FROM CONTEXT", user);
        if (user._id !== undefined) setUserId(user._id);
        if (user.name !== undefined) setName(user.name);
        if (user.email !== undefined) setEmail(user.email);
        if (user.picture !== undefined) setPicture(user.picture);
        if (user.createdAt !== undefined) setCreatedAt(user.createdAt);
        if (user.updatedAt !== undefined) setUpdatedAt(user.updatedAt);
        if (user.rootFolderId !== undefined) setRootFolderId(user.rootFolderId);

    };

    return (
        <UserContext.Provider
            value={{
                _id,
                name,
                email,
                picture,
                createdAt,
                updatedAt,
                rootFolderId,
                breadCrumb,
                activeFolder,
                accounts,

                setUserId,
                setName,
                setEmail,
                setPicture,
                setCreatedAt,
                setUpdatedAt,
                setRootFolderId,
                setActiveFolder,
                setBreadCrumb,
                setAccounts,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use the User Context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export default UserContext;
