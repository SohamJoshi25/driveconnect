import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

//Components
import DriveCard from "./components/DriveCard"
import Account from "./components/Account";

//Hooks
import useClickOutside from "../../common/hooks/useClickOutside";
import useSocketFileTransfer from "./utils/socket-util";

//Utils
import { folderSort, fileSort } from "./utils/component-utils";
import { createFolder, deleteFile, deleteFolder, getNestedFileInfo, getUserInfo } from "./utils/axios-util";
import { validateJWT } from "./utils/jwt-util";

//Context
import { useUserContext } from "./context/UserProvider";

//Types
import { Folder } from "./types/types";

//Packages
import { toast } from "sonner";

const Drive = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setUser, name, picture, rootFolderId, setActiveFolder, activeFolder, breadCrumb, setBreadCrumb, setAccounts } = useUserContext();


  const [token, setToken] = useState<string | null>(localStorage.getItem('token') ?? searchParams.get("token"));
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const { uploadFile, downloadFile } = useSocketFileTransfer(setError, setLoading, setProgress, setActiveFolder);

  const [fileFilter, setFileFilter] = useState<string>("ANAME");
  const [folderFilter, setFolderFilter] = useState<string>("ANAME");
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isNewFile, setIsNewFile] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const newRef = useClickOutside<HTMLDivElement>(() => {
    setIsNew(false);
    setIsNewFile(false);
  });

  const accountRef = useClickOutside<HTMLDivElement>(() => {
    setIsAccountOpen(false)
  });


  const openNew = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    setIsNew((p) => !p)
  }

  const openAccount = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsAccountOpen((p) => !p)
  }

  useEffect(() => {
    if (!token) {
      navigate('/landing');
    } else {
      const isJWTValid = validateJWT(token);

      if (isJWTValid) {
        getUserInfo(token, setUser, setAccounts, setError, setLoading);
      } else {
        localStorage.removeItem("token");
        setToken(null);
        console.log(isJWTValid);
        navigate("/landing")
        return;
      }
    }

    if (!localStorage.getItem('token') && token) {
      localStorage.setItem('token', token);
      setToken(token)
      navigate("/")
    }

  }, []);

  useEffect(() => {
    if (rootFolderId && token) {
      getNestedFileInfo(token!, rootFolderId, () => { }, setActiveFolder, setError, setLoading);
    }
  }, [rootFolderId]);


  const handleChangeFolder = (folder: Folder) => {
    if (loading) return;
    getNestedFileInfo(token!, folder._id, () => {
      const _breadCrumb = [...breadCrumb];
      _breadCrumb.push(activeFolder);
      setBreadCrumb(_breadCrumb);
    }, setActiveFolder, setError, setLoading);
  }

  const handleBackFolder = (index: number) => {

    if (loading) return;
    setLoading(true)
    let _breadCrumb = [...breadCrumb];

    if (_breadCrumb.length > 0) {
      _breadCrumb = _breadCrumb.slice(0, index);
      getNestedFileInfo(token!, breadCrumb[index]._id ?? rootFolderId, () => {
        setBreadCrumb(_breadCrumb);
      }, setActiveFolder, setError, setLoading);
    }

  }

  const handleCreateFolder = () => {
    if (loading) return;
    const name = window.prompt("Folder Name");
    if (name?.trim()) {
      createFolder(token!, name, activeFolder._id, setActiveFolder, setError, setLoading);
    }
  }

  const handleDeleteFolder = (folderId: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (loading) return;
    e.stopPropagation();
    deleteFolder(token!, folderId, setActiveFolder, setError, setLoading);
  }

  const handleDeleteFile = (fileId: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (loading) return;
    e.stopPropagation();
    deleteFile(token!, fileId, setActiveFolder, setError, setLoading);
  }

  const handleDownloadFile = (fileId: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (loading) return;
    e.stopPropagation();
    downloadFile(fileId, token!);
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/landing")
  }

  const handleUpload = () => {
    if (!file || !token) {
      toast.error("No File Selected");
      return;
    }
    setLoading(true);
    setIsNew(false);
    setIsNewFile(false);
    uploadFile(file, token, activeFolder._id);
  }

  const newFileMenu = () => {
    if (progress || loading) {
      toast.error("A File Uploading is in progress");
      setIsNewFile(false);
      return;
    }
    setIsNewFile(true);
  }


  return (
    <div className="relative min-h-screen min-w-vw text-white roboto-mono px-12 pb-16 overflow-y-auto">

      {/**Sidebar */}
      {<div
        ref={accountRef}
        className={`fixed customScrollBar h-[calc(100vh-10px)] w-[330px] pb-1 bg-[hsl(0,0%,7%)] right-0 top-0 rounded-[5px] border-[0.5px] border-[#a3a3a3] shadow-md 
          transition-all duration-250 ease-in-out overflow-y-hidden my-1
          ${isAccountOpen ? "opacity-100 scale-100 translate-y-0 z-10 " : "opacity-0 scale-0 translate-x-[1040px] -z-0"}`}
      >
        <Account token={token!} logout={logout} />

      </div>}

      {/**New File Menu */}
      {isNewFile && isNew && <div ref={newRef} className="absolute left-[-14px] z-40 min-h-screen w-full backdrop-blur-xs flex justify-center items-center">
        <div className="bg-[hsl(0,0%,7%)] flex flex-col items-start justify-center gap-3">
          <h1 className="text-white text-2xl">Upload File</h1>
          <input type="file" className="text-[#CACACA] hover:text-white cursor-pointer" onChange={(e) => { setFile(e.target.files![0]) }} />
          <button onClick={handleUpload} className="text-[#CACACA] hover:text-white cursor-pointer" >Upload</button>
          <button onClick={() => {
            setIsNew(false);
            setIsNewFile(false);
          }} className="text-[#CACACA] hover:text-white cursor-pointer mt-auto" >Back</button>
        </div>
      </div>}

      {/**Title */}
      {name && <div className="flex w-full justify-between items-end pt-12">
        <h1 className="text-4xl">
          {name}
        </h1>
        <img height={50} width={50} className="rounded-full" onClick={openAccount} src={picture} alt="User Profile Picture" />
      </div>}

      {!(error?.trim()) ? <div>

        {/**BreadCrumb and New Button */}
        {!loading && <div className="flex w-full justify-between items-end mt-14 gap-x-10 text-[#CACACA]">
          <div>
            <span className="">
              {
                breadCrumb && breadCrumb.map((folder, index) => <span><span className="hover:underline underline-offset-4 decoration-white cursor-pointer hover:text-white" onClick={() => handleBackFolder(index)} key={folder._id}>{folder.name}</span> / </span>)
              }
              {activeFolder && <span className="underline underline-offset-4 text-white cursor-pointer">{activeFolder.name}</span>} /
            </span>
          </div>

          <div className="relative flex gap-4 items-center justify-center">

            {progress && <div className="text-xs">A File Uploading is in progress {progress}</div>}

            <button type="button" className="rounded-[6px] w-[80px] border border-[#939393] py-2 px-3 flex items-center justify-around  hover:shadow-sm hover:border-white text-[#CACACA] hover:text-white shadow-[#7e7e7e] cursor-pointer" onClick={openNew}>+  New</button>

            {<div
              ref={newRef}
              className={`absolute h-fit w-30 pb-1 bg-[hsl(0,0%,7%)] right-0 top-0 rounded-[5px] border-[0.5px] border-[#a3a3a3] shadow-md 
                transition-all duration-250 ease-in-out 
                ${isNew ? "opacity-100 scale-100 translate-y-0 z-10 " : "opacity-0 scale-0 translate-y-[-50px] translate-x-[30px] -z-0"}`}
            >

              <div className="flex flex-col gap-2 p-2 h-full">
                <span className="text-[#CACACA] hover:text-white cursor-pointer" onClick={() => handleCreateFolder()}>New Folder</span>
                <span className="text-[#CACACA] hover:text-white cursor-pointer" onClick={newFileMenu}>New File</span>
              </div>

            </div>}

          </div>

        </div>}

        {/**Folders */}
        {!loading && <div className="flex flex-col mb-6 mt-22">
          <div className="pb-10p flex w-full justify-between mb-5">
            <span className="text-xl">Folders</span>
            <div>
              <select
                name="sortOptions"
                id="sortOptions"
                className="bg-[hsl(0,0%,7%)] text-sm text-[#CACACA] hover:text-white px-2 py-1 rounded-md outline-0 border border-[#939393] hover:border-white"
                onChange={(e) => { setFolderFilter(e.target.value) }}
                value={folderFilter}
              >
                <option value="ANAME">A → Z (Name)</option>
                <option value="DNAME">Z → A (Name)</option>
                <option value="ASIZE">Small → Large (Size)</option>
                <option value="DSIZE">Large → Small (Size)</option>
                <option value="AUSED">Least Recent (Used)</option>
                <option value="DUSED">Most Recent (Used)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap w-fit justify-evenly gap-y-5 gap-x-5">
            {activeFolder.subFolders && activeFolder.subFolders.length > 0 ? activeFolder.subFolders.sort((a, b) => folderSort(a, b, folderFilter)).map((folder) => {
              return <DriveCard folderData={folder} handleDeleteFolder={handleDeleteFolder} handleChangeFolder={handleChangeFolder} />
            }) : <div className="w-full">No SubFolder Found</div>}
          </div>
        </div>}

        {/**Files */}
        {!loading && <div className="flex flex-col mt-22">
          <div className="flex w-full justify-between mb-5">
            <span className="text-xl">Files</span>
            <div>
              <select
                name="sortOptions"
                id="sortOptions"
                className="bg-[hsl(0,0%,7%)] text-sm text-[#CACACA] hover:text-white px-2 py-1 rounded-md outline-0 border border-[#939393] hover:border-white"
                onChange={(e) => { setFileFilter(e.target.value) }}
                value={fileFilter}
              >
                <option value="ANAME">A → Z (Name)</option>
                <option value="DNAME">Z → A (Name)</option>
                <option value="ASIZE">Small → Large (Size)</option>
                <option value="DSIZE">Large → Small (Size)</option>
                <option value="AEXT">A → Z (Extension)</option>
                <option value="DEXT">Z → A (Extension)</option>
                <option value="AUSED">Least Recent (Used)</option>
                <option value="DUSED">Most Recent (Used)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap w-fit justify-evenly gap-y-5 gap-x-5">
            {activeFolder.subFiles && activeFolder.subFiles.length > 0 ? activeFolder.subFiles.sort((a, b) => fileSort(a, b, fileFilter)).map((file) => {
              return <DriveCard fileData={file} handleDeleteFile={handleDeleteFile} handleDownloadFile={handleDownloadFile} />
            }) : <div className="w-full">No SubFiles Found</div>}
          </div>
        </div>}

        {loading && <div className="flex justify-center items-center gap-2 w-full mt-30">
          loading . . .
        </div>}

      </div> : <div className="flex justify-center items-center gap-2 w-full mt-20">
        <span>{error}</span>
      </div>}


    </div>
  )

}

export default Drive