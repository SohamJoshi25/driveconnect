import { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'sonner';
import { Folder, File as IFile } from '../types/types';
import { BACKEND_DOMAIN } from '../../../common/constants';

const socketInstance = io(BACKEND_DOMAIN);

interface FileMetadata {
  name: string;
  extention: string;
  size: number;
}

const useSocketFileTransfer = ( setError:React.Dispatch<React.SetStateAction<string | null>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>,setProgress:React.Dispatch<React.SetStateAction<string | null>>, setActiveFolder: React.Dispatch<React.SetStateAction<Folder>>) => {
  const writableStreamRef = useRef<FileSystemWritableFileStream | null>(null);
  const isWriterBusy = useRef<boolean>(false);
  let CHUNK_COUNT = 1;
  let CHUNK_SIZE = 1;
  let CHUNK_RECIEVED = 0;

  useEffect(() => {

    socketInstance.on('connect', () => {
      console.log('Successfully connected to the server');
    });

    socketInstance.on('connect_error', (error:Error) => {
      console.error('Connection failed:', error);
    });

    socketInstance.on('disconnect', (reason:string) => {
      console.error('Socket disconnected:', reason);
    });

    socketInstance.on('file_info_download', async (file: FileMetadata, callback: (response: { success: boolean }) => void) => {
      await requestFileStream(`${file.name}.${file.extention}`);

      window.addEventListener('beforeunload',handleCLoseDialogueDownload);

      setTimeout(() => {
        callback({ success: true });
      }, 500);
      console.log(new Date())
    });


    socketInstance.on('file_chunk_download', async (chunk: { fileBuffer: ArrayBuffer }, callback: (response: { success: boolean }) => void) => {
      if (writableStreamRef.current) {
        isWriterBusy.current = true; 
        await writableStreamRef.current.write(new Uint8Array(chunk.fileBuffer));
        callback({ success: true });
        isWriterBusy.current = false;
      }
    });

    socketInstance.on('file_download_end',fileDownloadEnd );


    return () => {
    
    };
  }, []);

  const handleCLoseDialogueDownload = (e) => {
    e.preventDefault();
    toast.error("A File Download in in Progress. You can close after File downloading is finished.");
  }

  const handleCLoseDialogueUpload = (e) => {
    e.preventDefault();
    toast.error("A File Upload in in Progress. You can close after File uploading is finished.");
  }

  const fileDownloadEnd = async  () => {
    window.removeEventListener('beforeunload', handleCLoseDialogueDownload);
    setTimeout(async ()=>{
      if (writableStreamRef.current && !isWriterBusy.current) {
        await writableStreamRef.current.close();
        writableStreamRef.current = null;
        setProgress(null);
        toast.success("File Download Completed")
      }
    },2000);
  }

  const uploadFile = async (file: File, token:string, parentFolderId?:string) => {
    if (!file) return;

    let _file : IFile | null  = null;

    await new Promise<void>((resolve, reject) => {
      socketInstance.emit(
        'file_upload_start',
        {
          token: token,
          name: file.name.split('.')[0],
          extention: file.name.split('.').pop(),
          size: file.size,
          parentFolderId
        },
        (ack: { success: boolean; token: string; chunk_size: number, file:IFile, error?:string }) => {
          if (ack && ack.success) {
            token = ack.token;
            CHUNK_SIZE = ack.chunk_size;
            CHUNK_COUNT = Math.ceil(file.size/CHUNK_SIZE);
            CHUNK_RECIEVED = 0;
            _file = ack.file;
            window.addEventListener('beforeunload', handleCLoseDialogueUpload);
            setProgress(`${CHUNK_RECIEVED} / ${CHUNK_COUNT}`);
            setLoading(false);
            toast.success("File Upload Started")
            
            resolve();
          } else {
            setLoading(false);
            toast.error(ack.error ?? "Failed to Upload File")
            reject(new Error('Failed to start'));
          }
        }
      );
    });
    setLoading(false);

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let offset = 0;

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(offset, offset + CHUNK_SIZE);
      const chunkBuffer = await chunk.arrayBuffer();
      setProgress(`${i+1} / ${totalChunks}`);
      await new Promise<void>((resolve, reject) => {
        socketInstance.emit(
          'file_chunk',
          { chunkBuffer, chunkIndex: i, token },
          (ack: { success: boolean }) => {
            if (ack && ack.success) {
              resolve();
            } else {
              reject(new Error('Failed to upload chunk'));
            }
          }
        );
      });
      offset += CHUNK_SIZE;
    }
    window.removeEventListener('beforeunload', handleCLoseDialogueUpload);
    setProgress(null);
    setActiveFolder((prev) => ({
      ...prev,
      subFiles: [...prev.subFiles, _file!],
    }));
    
    socketInstance.emit('file_upload_end');
  };

  const downloadFile = async (fileId: string, token:string) => {
    if(isWriterBusy.current){
      return;
    }
    await new Promise<void>((resolve, reject) => {
      socketInstance.emit(
        'file_download_start',
        { token, fileId },
        (ack: { success: boolean }) => {
          if (ack && ack.success) {
            setLoading(false);
            toast.success("File Download Started")
            resolve();
          } else {
            toast.error("Failed to Download File")
            reject(new Error('Failed to start download'));
          }
        }
      );
    });
  };

  const requestFileStream = async (fileName: string) => {
    if (!('showSaveFilePicker' in window)) {
      throw new Error('File System Access API is not supported in this browser.');
    }
  
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [{ description: 'All Files' }],
    });
  
    const writableStreamHandle = await handle.createWritable();
    if(!writableStreamRef.current){
      writableStreamRef.current = writableStreamHandle;
    }
    
  };

  return { uploadFile, downloadFile };
};

export default useSocketFileTransfer;
