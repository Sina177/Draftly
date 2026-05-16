"use client";
import { use, useState} from "react";
import {Upload} from "lucide-react";
import { useRef } from "react";

export default function UploadZone() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const displayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files![0]));
  };
  return (
    <>
        <div className="flex flex-col items-center justify-center bg-white border-2 p-12 border-dashed rounded-lg" onClick={() => inputRef.current?.click()}>
          <Upload size={48} className="text-blue-500 mb-4"/>
            <p className="text-blue-500">Browse Your Files</p>
          <input className="hidden" type="file" ref={inputRef} accept="image/*" onChange={(e) => displayImage(e)}/>
        </div>
        <p className="text-center text-gray-600 text-sm mt-2">Supported formats: JPG, PNG, GIF, WebP</p>
      {/* <div className="w-64 h-64 mb-4">
          {image && <img className="w-64 h-64 object-cover" src={image} alt="Uploaded Image"/>}
      </div> */}
    </>
  )
}