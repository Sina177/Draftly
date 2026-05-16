"use client";
import { use, useRef } from "react";
import {Camera} from "lucide-react";
import {useState } from "react";

export default function CameraCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files![0]));
  };  

  return (
    <div className="flex items-center justify-center bg-blue-100 border border-gray-400 p-12 rounded-lg gap-3" onClick={() => inputRef.current?.click()}>
      <Camera size={48} className="text-blue-500 mb-4"/>
      <p className="text-blue-500 text-sm">Take a photo of your draft or sketch</p>
      <input className="hidden" type="file" accept="image/*" capture="environment" ref={inputRef} onChange={(e) => {onFileSelect(e)}} />
    </div>
  )
}