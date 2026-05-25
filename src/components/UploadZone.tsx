"use client";
import {Upload} from "lucide-react";
import { useRef } from "react";

export default function UploadZone({onFileSelect}: {onFileSelect: (file: File) => void}) {

  const inputRef = useRef<HTMLInputElement>(null);

  const sendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files![0]);
  };
  return (
    <>
        <div className="flex flex-col items-center justify-center bg-[#D5FFFF] border-2 p-2 border-dashed rounded-lg border-blue-500" onClick={() => inputRef.current?.click()}>
          <Upload size={48} className="text-blue-500 mb-4"/>
            <p className="text-blue-500 text-center">Browse Your Files</p>
          <input className="hidden" type="file" ref={inputRef} accept="image/*" onChange={(e) => sendImage(e)}/>
        </div>
        <p className="text-center text-gray-400 text-sm mt-2 text-xs">Supported formats: JPG, PNG, GIF, WebP</p>
      {/* <div className="w-64 h-64 mb-4">
          {image && <img className="w-64 h-64 object-cover" src={image} alt="Uploaded Image"/>}
      </div> */}
    </>
  )
}