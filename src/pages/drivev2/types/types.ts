export type File = {
    _id: string;
    userId: string;
    parenFolderId: string;
    name: string;
    extention: string;
    size: number;
    chunkSize: number;
    downloadedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Folder = {
    _id: string;
    userId: string;
    parenFolderId: string;
    name: string;
    size: number;
    subFolders: Folder[];
    subFiles: File[];
    path: string[];
    createdAt?: string;
    updatedAt?: string;
}


export type Account = {
    _id: string;
    email: string;
    picture: Base64URLString;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}