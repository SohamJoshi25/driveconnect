import { useState} from 'react'

import useSocketFileTransfer from '../utils/socket-util'
import { useUserContext } from '../context/UserProvider';

type Props = {
    setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
    token:string;
}

const Upload = ({setIsUpload, token}: Props) => {
    const { uploadFile } = useSocketFileTransfer();
    const {activeFolder} = useUserContext();
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if(!file || !token)return;
        console.log(activeFolder)
        uploadFile(file,token,activeFolder._id);
    }

    console.log(activeFolder)

  return (
    <div>
        <div onClick={() => setIsUpload(false)}>
            close X
        </div>
        <div>Upload</div>
        <div>
            <input type="file" name="" id="" onChange={(e) => {console.log(e.target.files);setFile(e.target.files![0])}} />
            <button className='bg-sky-300 p-10' onClick={handleUpload}>Upload</button>
        </div>
    </div>
  )
}
export default Upload;