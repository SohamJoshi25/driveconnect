import { useState } from "react";
import DriveCard from "./components/DriveCard"

import Data from "./root_folder.json"
import { File, Folder } from "./types/types"
import useClickOutside from "../../common/hooks/useClickOutside";

const Drive = () => {

  const [fileFilter, setFileFilter] = useState<string>("ANAME");
  const [folderFilter, setFolderFilter] = useState<string>("ANAME");
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const newRef = useClickOutside<HTMLDivElement>(() => {
    setIsNew(false)
  });

  const accountRef = useClickOutside<HTMLDivElement>(() => {
    setIsAccountOpen(false)
  });

  const fileSort = (a: File, b: File): number => {
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

  const folderSort = (a: Folder, b: Folder): number => {
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

  const openNew = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsNew((p) => !p)
  }

  const openAccount = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsAccountOpen((p) => !p)
  }

  return (
    <div className="relative min-h-screen min-w-vw text-white roboto-mono px-12 pb-16 overflow-y-auto">

      {/**Sidebar */}
      {<div
        ref={accountRef}
        className={`fixed customScrollBar h-full w-[240px] pb-1 bg-[hsl(0,0%,7%)] right-0 top-0 rounded-[5px] border-[0.5px] border-[#a3a3a3] shadow-md 
              transition-all duration-250 ease-in-out overflow-y-hidden
              ${isAccountOpen ? "opacity-100 scale-100 translate-y-0 z-10 " : "opacity-0 scale-0 translate-x-[1040px] -z-0"}`}
      >

        <div className="flex flex-col gap-2 p-2 h-screen pt-5 pl-5 text-lg">

          <span className="text-[#CACACA] hover:text-white cursor-pointer text-xl">Soham Joshi</span>
          <img height={50} width={50} className="rounded-full mt-2" onClick={openAccount} src="data:image/jpeg;base64,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" alt="User Profile Picture" />
          <span className="text-[#CACACA] hover:text-white cursor-pointer mt-14">Settings</span>
          <span className="text-[#CACACA] hover:text-white cursor-pointer">New File</span>
        </div>

      </div>}

      <div className="flex w-full justify-between items-end pt-12">
        <h1 className="text-4xl">
          Soham Joshi
        </h1>
        <img height={50} width={50} className="rounded-full" onClick={openAccount} src="data:image/jpeg;base64,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" alt="User Profile Picture" />
      </div>

      <div className="flex w-full justify-between items-end mt-14 gap-x-10 text-[#CACACA]">
        <div className="hover:text-white">
          root / FOlder2 / SubFolder/ My Folder2 / ff / temp /
        </div>

        <div className="relative">
          <button type="button" className="rounded-[6px] w-[80px] border border-[#939393] py-2 px-3 flex items-center justify-around  hover:shadow-sm hover:border-white text-[#CACACA] hover:text-white shadow-[#7e7e7e] cursor-pointer" onClick={openNew}>+  New</button>

          {<div
            ref={newRef}
            className={`absolute h-fit w-40 pb-1 bg-[hsl(0,0%,7%)] right-0 top-0 rounded-[5px] border-[0.5px] border-[#a3a3a3] shadow-md 
              transition-all duration-250 ease-in-out 
              ${isNew ? "opacity-100 scale-100 translate-y-0 z-10 " : "opacity-0 scale-0 translate-y-[-50px] translate-x-[30px] -z-0"}`}
          >

            <div className="flex flex-col gap-2 p-2 h-full">
              <span className="text-[#CACACA] hover:text-white cursor-pointer">New Folder</span>
              <span className="text-[#CACACA] hover:text-white cursor-pointer">New File</span>
            </div>

          </div>}

        </div>
      </div>

      <div className="flex flex-col mb-6 mt-22">
        <div className="pb-10 px-4 flex w-full justify-between">
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
        <div className="flex flex-wrap w-full justify-evenly gap-y-5 gap-x-5">
          {Data.subFolders.sort(folderSort).map((folder) => {
            return <DriveCard folderData={folder} />
          })}
        </div>
      </div>

      <div className="flex flex-col mt-22">
        <div className="pb-10 px-4 flex w-full justify-between">
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
        <div className="flex flex-wrap w-full justify-evenly gap-y-5 gap-x-5">
          {Data.subFiles.sort(fileSort).map((files) => {
            return <DriveCard fileData={files} />
          })}
        </div>
      </div>


    </div>
  )

}

export default Drive