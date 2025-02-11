import { useState, useEffect, use } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

//Utils
import { getNestedFileInfo, getUserInfo } from "./utils/axios-util";
import { validateJWT } from "./utils/jwt-util";

//Context
import { useUserContext } from "./context/UserProvider";

const Drive = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setUser, _id, name, email, picture, createdAt, updatedAt, rootFolderId, setActiveFolder, activeFolder } = useUserContext();

  const [token, setToken] = useState<string | null>(localStorage.getItem('token') ?? searchParams.get("token"));
  const [error, setError] = useState<string | null>("");



  useEffect(() => {
    if (!token) {
      navigate('/landing');
    } else {
      if (validateJWT(token)) {
        getUserInfo(token, setUser, setError);
      } else {
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
    if (rootFolderId) {
      getNestedFileInfo(token!, rootFolderId, setActiveFolder, setError);
      console.log(picture)
    }
  }, [rootFolderId]);



  return (
    <div>
      <h1>Drive</h1>
      {_id && <div>
        <span>Id : {_id}</span>
        <span>Email : {email}</span>
        <span>Name : {name}</span>
        <span>CreatedAt : {createdAt}</span>
        <span>UpdatedAt : {updatedAt}</span>
        <img src={picture} alt="User Image" className="w-20 h-20" />
      </div>}
      {activeFolder.subFolders && <div className="p-2">

        <div>
          <span className="underline">{activeFolder.name}</span>
        </div>

        {activeFolder.subFolders.length >= 0 && <div className="my-10">
          {activeFolder.subFolders.map((folder) => { console.log(folder); return <span key={folder._id} className="bg-slate-300 rounded-md p-4 w-10 h-5 m-2 cursor-pointer" onClick={() => { setActiveFolder(folder) }}>{folder.name}</span> })}
        </div>}

        {
          activeFolder.subFiles.length >= 0 && <div className="my-10">
            {activeFolder.subFiles.map((file) => { console.log(file); return <span key={file._id} className="bg-slate-300 rounded-md p-4 w-10 h-5 m-2">{file.name}</span> })}
          </div>
        }
      </div >}
    </div >
  )
}

export default Drive;