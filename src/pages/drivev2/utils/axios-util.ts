import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { BACKEND_DOMAIN } from "../../../common/constants";
import { UserContextType } from "../context/UserProvider";
import { Folder } from "../types/types";
import { toast } from "sonner";

export const getUserInfo = async (token: string, setUser: (setUser: Partial<UserContextType>) => void, setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
  try {
    setLoading(true);
    const response = await axios.get(BACKEND_DOMAIN + "/v1/user/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.user)
    setUser(response.data.user);
  } catch (error) {
    console.log(error);
    setError(JSON.stringify(error));
  }
};

export const getNestedFileInfo = async (token: string, folderId: string, callback:(response:Folder) => void, setActiveFolder: React.Dispatch<React.SetStateAction<Folder>>, setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
  try {
    setLoading(true);
    const response = await axios.get(BACKEND_DOMAIN + "/v1/folder/" + folderId + "/nestedinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback(response.data.folder);
    setActiveFolder(response.data.folder);
  } catch (error) {
    console.log(error);
    setError(JSON.stringify(error));
  }finally{
    setLoading(false);
  }
};

export const createFolder = async (
  token: string,
  name: string,
  parentfolderId: string,
  setActiveFolder: React.Dispatch<React.SetStateAction<Folder>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const response = await axios.post(BACKEND_DOMAIN + "/v1/folder/" + parentfolderId + "/create", {
      name:name
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActiveFolder((prev) => ({
      ...prev,
      subFolders: [...prev.subFolders, response.data.folder],
    }));
    
  } catch (error) {
    console.log(error);
    setError(JSON.stringify(error));
  }finally{
    setLoading(false);
  }
};

export const deleteFolder = async (
  token: string,
  folderId: string,
  setActiveFolder: React.Dispatch<React.SetStateAction<Folder>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {

    const response = await axios.delete(BACKEND_DOMAIN + "/v1/folder/" + folderId + "/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setActiveFolder((prev) => {
      let newSubFolder = [...(prev.subFolders)];
      newSubFolder = newSubFolder.filter(f => {
        return f._id !== folderId;
      })
      return {
        ...prev,
        subFolders: newSubFolder,
      }
    });
    
  } catch (error) {
    console.log(error);
    toast.error("Cannot Delete a Non-Empty Folder")
  }
}

export const deleteFile = async (
  token: string,
  fileId: string,
  setActiveFolder: React.Dispatch<React.SetStateAction<Folder>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {

    const response = await axios.delete(BACKEND_DOMAIN + "/v1/file/" + fileId + "/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setActiveFolder((prev) => {
      let newSubFiles = [...(prev.subFiles)];
      newSubFiles = newSubFiles.filter(f => {
        return f._id !== fileId;
      })
      console.log(newSubFiles,fileId)
      return {
        ...prev,
        subFiles: newSubFiles,
      }
    });
    
  } catch (error) {
    console.log(error);
    setError(JSON.stringify(error));
  }
}