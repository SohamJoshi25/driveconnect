import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

//Utils
import { createFolder, deleteFile, deleteFolder, getNestedFileInfo, getUserInfo } from "./utils/axios-util";
import { validateJWT } from "./utils/jwt-util";

//Components
import Upload from "./components/Upload"

//Context
import { IFolder, useUserContext } from "./context/UserProvider";
import useSocketFileTransfer from "./utils/socket-util";
import { BACKEND_DOMAIN } from "../../common/constants";

const Drive = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { downloadFile } = useSocketFileTransfer();

  const { setUser, _id, name, email, picture, createdAt, updatedAt, rootFolderId, setActiveFolder, activeFolder , breadCrumb, setBreadCrumb } = useUserContext();

  const [token, setToken] = useState<string | null>(localStorage.getItem('token') ?? searchParams.get("token"));
  const [error, setError] = useState<string | null>("");
  const [isUpload, setIsUpload] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      navigate('/landing');
    } else {
      const isJWTValid = validateJWT(token);
      if (isJWTValid) {
        getUserInfo(token, setUser, setError);
      } else {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/landing")
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
      getNestedFileInfo(token!, rootFolderId, () => {}, setActiveFolder, setError);
    }
  }, [rootFolderId]);

  const changeFolder = (folder:IFolder) => {
    getNestedFileInfo(token!, folder._id, () => {
      const _breadCrumb = [...breadCrumb];
      _breadCrumb.push(activeFolder);
      setBreadCrumb(_breadCrumb);
    }, setActiveFolder, setError);
  }

  const backFolder = () => {
    const _breadCrumb = [...breadCrumb];
    if(_breadCrumb.length>0){
      const lastFolder = _breadCrumb.pop()!;
      getNestedFileInfo(token!, lastFolder._id, () => {
        setBreadCrumb(_breadCrumb);
      }, setActiveFolder, setError);
    }
  }

  const createFolderHandle = () => {
    const name = window.prompt("Folder Name");
    if(name?.trim()){
      createFolder(token!,name,activeFolder._id,setActiveFolder,setError);
    }
  }

  const handleDeleteFolder = (folderId:string,e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFolder(token!,folderId,setActiveFolder,setError);
  }
 
  const handleDeleteFile = (fileId:string,e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile(token!,fileId,setActiveFolder,setError);
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/landing")
  }

  const addAccount = () => {
    window.location.href = BACKEND_DOMAIN + `/v1/auth/accountlogin?token=${token}`;
  }

  return (
    <div>
      <h1>Drive</h1>
      {_id && <div className="flex flex-col bg-slate-300 justify-center items-start gap-5 p-5">
        <span>Id : {_id}</span>
        <span>Email : {email}</span>
        <span>Name : {name}</span>
        <span>CreatedAt : {createdAt}</span>
        <span>UpdatedAt : {updatedAt}</span>
        <img src={picture} alt="User Image" className="w-20 h-20" />
        <button className="p-1 bg-slate-400 rounded-lg h-10 w-32 cursor-pointer" onClick={logout}>Logout</button>
        <button className="p-1 bg-slate-400 rounded-lg h-10 w-32 cursor-pointer" onClick={addAccount}>Add Account</button>
      </div>}



      {activeFolder.subFolders && <div className="p-2">

        <div className="flex flex-row justify-between gap-x-10 my-5 p-2 items-center text-center">
          {breadCrumb.length>0 && <button className="p-1 bg-slate-400 rounded-lg h-10 w-20 cursor-pointer" onClick={backFolder}>Back</button>}
          <span className="p-1 bg-amber-100 px-5 h-10 w-full cursor-pointer text-left">
            {
              breadCrumb &&  breadCrumb.map((folder) => <span><span className="hover:underline" key={folder._id}>{folder.name}</span> / </span> )
            }
            {activeFolder && <span className="hover:underline">{activeFolder.name}</span>} /
          </span>
          <div className="flex flex-row gap-x-10">
            <button className="p-1 bg-slate-400 rounded-lg h-10 w-32 cursor-pointer" onClick={createFolderHandle}>Create Folder</button>
            <button className="p-1 bg-slate-400 rounded-lg h-10 w-32 cursor-pointer" onClick={() => setIsUpload(true)}>{isUpload ? "Close" : "Upload File"}</button>
          </div>
        </div>

        {!isUpload && activeFolder.subFolders.length >= 0 && <div className="my-10 columns-5">
          {activeFolder.subFolders.map((folder) => {return <span key={folder._id} className="bg-slate-300 rounded-md p-2 w-fit h-10 m-2 cursor-pointer" onClick={() => changeFolder(folder)}>{folder.name} <span className="text-red-700 border-2 h-[10px] w-[10px] cursor-pointer" onClick={(e) => {handleDeleteFolder(folder._id,e)}}>X</span></span> })}
        </div>}

        {!isUpload &&
          activeFolder.subFiles.length >= 0 && <div className="my-10 flex flex-wrap">
            {activeFolder.subFiles.map((file) => {return <span key={file._id} className="bg-slate-300 rounded-md p-2 w-fit h-10 m-2" onDoubleClick={()=>{downloadFile(file._id,token!)}} >{file.name} <span className="text-red-700 border-2 h-[10px] w-[10px] cursor-pointer" onClick={(e) => {handleDeleteFile(file._id,e)}}>X</span></span> })}
          </div>
        }

        {isUpload && <Upload setIsUpload={setIsUpload} token={token!}/>}

      </div >}
    </div >
  )
}

export default Drive;