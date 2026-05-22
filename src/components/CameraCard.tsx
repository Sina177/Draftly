"use client";
import { use, useRef } from "react";
import {Camera} from "lucide-react";

export default function CameraCard({onFileSelect}: {onFileSelect: (url: string) => void}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(URL.createObjectURL(e.target.files![0]));
  };  

  return (
    <div className="flex items-center justify-center bg-[#D5FFFF] border border-blue-200 p-2 rounded-lg gap-3" onClick={() => inputRef.current?.click()}>
      <Camera size={48} className="text-blue-500 mb-4"/>
      <p className="text-blue-500 text-sm">Take a photo of your draft or sketch</p>
      <input className="hidden" type="file" accept="image/*" capture="environment" ref={inputRef} onChange={(e) => sendImage(e)}/>
    </div>
  )
}