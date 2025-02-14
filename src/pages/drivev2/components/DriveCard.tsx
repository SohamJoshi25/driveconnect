//Hooks
import useClickOutside from "../../../common/hooks/useClickOutside";

//Types
import { Folder, File } from "../types/types"

//Assets
import MenuSVG from "../assets/svg/MenuSVG"
import FolderSVG from "../assets/svg/FolderSVG"

import { useRef, useState } from "react";

type Props = {
  fileData?: File;
  folderData?: Folder;
}

const DriveCard = ({ fileData, folderData }: Props) => {

  const [menu, setMenu] = useState<boolean>(false);

  const folderNameRef = useRef<HTMLInputElement>(null);

  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setMenu(false)
  });

  const openMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setMenu((p) => !p)
  }


  return (
    <div className="relative h-[50px] w-fit rounded-[5px] border border-[#939393] text-[#CACACA] flex items-center hover:shadow-sm shadow-[#7e7e7e] peer-[name]" onMouseOver={() => { if (folderNameRef.current) folderNameRef.current.style.color = "#ffba00" }} onMouseOut={() => { if (folderNameRef.current) folderNameRef.current.style.color = "#CACACA" }}>
      {/* PPTX Label */}
      <div className="w-[6ch] mx-[6px] flex justify-center items-center tracking-tighter font-semibold roboto-mono hover overflow-hidden">
        {fileData?.extention ?? <FolderSVG />}
      </div>

      {/* Text Container with Proper Shrink Behavior */}
      <div className="w-[160px] h-full flex items-center my-auto border-l border-[#939393] px-[8px] tracking-tight roboto-mono">
        <span className="tracking-tighter text-[14px] roboto-mono overflow-hidden text-ellipsis whitespace-nowrap" ref={folderNameRef}>
          {fileData?.name ?? folderData?.name}
        </span>
      </div>

      {/* Menu Dots (Ensuring it does NOT shrink) */}
      <div className="w-[22px] ml-auto h-full pr-[10px] flex items-center justify-center group cursor-pointer" onClick={openMenu}>
        <MenuSVG />
      </div>

      {<div
        ref={menuRef}
        className={`absolute h-fit w-40 pb-1 bg-[hsl(0,0%,7%)] right-0 top-0 rounded-[5px] border-[0.5px] border-[#a3a3a3] shadow-md 
          transition-all duration-150 ease-in-out 
          ${menu ? "opacity-100 scale-100 translate-y-0 z-10 " : "opacity-0 scale-0 translate-y-[-50px] -z-0"}`}
      >
        {fileData ?
          <div className="flex flex-col gap-2 p-2 h-full">
            <span className="hover:text-white cursor-pointer">Rename</span>
            <span className="hover:text-white cursor-pointer">Download</span>
            <span className="text-red-700 hover:text-red-500 cursor-pointer">Delete</span>
          </div> :
          <div className="flex flex-col gap-2 p-2 h-full">
            <span className="hover:text-white cursor-pointer">Rename</span>
            <span className="text-red-700 hover:text-red-500 cursor-pointer">Delete</span>
          </div>
        }

      </div>}
    </div>

  )
}

export default DriveCard