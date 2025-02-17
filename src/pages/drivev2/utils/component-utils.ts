import { File, Folder } from "../types/types";

export const fileSort = (a: File, b: File, fileFilter:string): number => {
    switch (fileFilter) {
      case "ANAME": return a.name.localeCompare(b.name);
      case "DNAME": return b.name.localeCompare(a.name);
      case "ASIZE": return a.size - b.size;
      case "DSIZE": return b.size - a.size;
      case "AEXT": return a.extention.localeCompare(b.extention);
      case "DEXT": return b.extention.localeCompare(a.extention);
      case "AUSED": return (new Date(a.updatedAt!)).getTime() - (new Date(b.updatedAt!)).getTime();
      case "DUSED": return (new Date(b.updatedAt!)).getTime() - (new Date(a.updatedAt!)).getTime();
    }
    return 0;
  }

  export const folderSort = (a: Folder, b: Folder, folderFilter:string): number => {
    switch (folderFilter) {
      case "ANAME": return a.name.localeCompare(b.name);
      case "DNAME": return b.name.localeCompare(a.name);
      case "ASIZE": return a.size - b.size;
      case "DSIZE": return b.size - a.size;
      case "AUSED": return (new Date(a.updatedAt!)).getTime() - (new Date(b.updatedAt!)).getTime();
      case "DUSED": return (new Date(b.updatedAt!)).getTime() - (new Date(a.updatedAt!)).getTime();
    }
    return 0;
  }