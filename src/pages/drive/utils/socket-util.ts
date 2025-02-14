import { useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socketInstance = io('http://localhost:8081');

interface FileMetadata {
  name: string;
  extention: string;
  size: number;
}

const useSocketFileTransfer = () => {
  const writableStreamRef = useRef<FileSystemWritableFileStream | null>(null);
  const isWriterBusy = useRef<boolean>(false);

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
      setTimeout(() => {
        callback({ success: true });
      }, 500);
      console.log(new Date())
    });


    socketInstance.on('file_chunk_download', async (chunk: { fileBuffer: ArrayBuffer }, callback: (response: { success: boolean }) => void) => {
      if (writableStreamRef.current) {
        isWriterBusy.current = true;
        console.log('Chunk Received', chunk);
        await writableStreamRef.current.write(new Uint8Array(chunk.fileBuffer));
        callback({ success: true });
        isWriterBusy.current = false;
      }
    });

    socketInstance.on('file_download_end',fileDownloadEnd );

    return () => {
    
    };
  }, []);

  const fileDownloadEnd = async  () => {
    console.log(isWriterBusy.current);
    setTimeout(async ()=>{
      if (writableStreamRef.current && !isWriterBusy.current) {
        await writableStreamRef.current.close();
        writableStreamRef.current = null;
        console.log(new Date())
      }
    },2000);
  }

  const uploadFile = async (file: File, token:string, parentFolderId?:string) => {
    if (!file) return;
    console.log(file,token,parentFolderId)

    let CHUNK_SIZE = 1;

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
        (ack: { success: boolean; token: string; chunk_size: number }) => {
          if (ack && ack.success) {
            token = ack.token;
            CHUNK_SIZE = ack.chunk_size;
            resolve();
          } else {
            reject(new Error('Failed to start'));
          }
        }
      );
    });

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let offset = 0;

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(offset, offset + CHUNK_SIZE);
      const chunkBuffer = await chunk.arrayBuffer();

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
            console.log('File Download Started');
            resolve();
          } else {
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
