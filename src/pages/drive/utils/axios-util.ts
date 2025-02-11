import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { BACKEND_DOMAIN } from "../../../common/constants";
import { IFolder, UserContextType } from "../context/UserProvider";

export const getUserInfo = async (token: string, setUser: (setUser: Partial<UserContextType>) => void, setError: Dispatch<SetStateAction<string | null>>) => {
  try {
    const response = await axios.get(BACKEND_DOMAIN + "/v1/user/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.user);
    setUser(response.data.user);
  } catch (error) {
    console.log(error);
    setError(JSON.stringify(error));
  }
};

export const getNestedFileInfo = async (token: string, folderId: string, setActiveFolder: React.Dispatch<React.SetStateAction<IFolder>>, setError: Dispatch<SetStateAction<string | null>>) => {
  try {
    const response = await axios.get(BACKEND_DOMAIN + "/v1/folder/" + folderId + "/nestedinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActiveFolder(response.data.folder);
  } catch (error) {
    console.log(error);
    setError(JSON.stringify(error));
  }
};
