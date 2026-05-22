"use client";
import { Plus, Minus, Expand, X } from "lucide-react";
import { useState } from "react";

export default function PreviewPanel({image}: {image: string | null}) {

  const [scale, setScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center">
          <p className="mb-3 font-bold">2. Preview</p>
          <div className="flex items-center gap-2">
            <div className="flex border border-gray-300 rounded-lg divide-x divide-gray-300 items-stretch mb-2">
              <Minus size={40} className="text-gray-500 px-2 py-1 cursor-pointer" onClick={() => setScale(Math.max(0.1, scale - 0.1))}/>
              <p className="text-gray-500 px-2 py-1 flex w-15 items-center justify-center">{(scale * 100).toFixed(0)}%</p>
              <Plus size={40} className="text-gray-500 px-2 py-1 cursor-pointer" onClick={() => setScale(Math.min(3, scale + 0.1))}/>
            </div>
            <div className="mb-2">
              <Expand size={40} className="text-gray-500 px-2 py-1 cursor-pointer" onClick={() => setIsFullScreen(!isFullScreen)}/>
            </div>  
          </div>
          
        </div>
        <div className="flex-1 overflow-auto bg-[#D5FFFF] border border-blue-200 rounded-lg">
          {image && <img src={image} alt="Preview" className="w-full h-full object-contain" style={{ transform: `scale(${scale})` }}/>}
          {!image && <p className="w-full h-full flex items-center justify-center text-gray-400">Your uploaded image will appear here</p>}
        </div>
      </div>
      <div className={`fixed inset-0 z-50 bg-black/80 ${isFullScreen ? '' : 'hidden'}`} onClick={() => setIsFullScreen(false)}>
        <img src={image!} alt="Full Screen Preview" className="w-full h-full object-contain" style={{ transform: `scale(${scale})` }}/>
        <X size={40} className="absolute top-4 right-4 text-white cursor-pointer hover:text-gray-300" onClick={() => setIsFullScreen(false)}/>
      </div>
    </>
  )

}