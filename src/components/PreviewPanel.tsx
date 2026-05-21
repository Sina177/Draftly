"use client";
import { Plus, Minus } from "lucide-react";

export default function PreviewPanel({image}: {image: string | null}) {

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <p className="mb-3 font-bold">2. Preview</p>
        <div className="flex gap-2">
          <Minus size={20} className="text-gray-500"/>
          <Plus size={20} className="text-gray-500"/>
        </div>
      </div>
      <div className="flex-1 overflow-hidden border border-blue-200 rounded-lg">
        {image && <img src={image} alt="Preview" className="w-full h-full object-contain"/>}
        {!image && <p className="w-full h-full flex items-center justify-center text-gray-400">Your uploaded image will appear here</p>}
      </div>
    </div>
  )

}