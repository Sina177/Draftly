import { Lightbulb, Check } from "lucide-react";

export default function TipsList() {

  return (
    <div className="flex flex-col bg-white border border-gray-200 p-3 rounded-lg  min-h-[20vh]">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="mb-2 text-blue-500"/>
        <h2 className="mb-2 text-blue-500">Tips</h2>
      </div>
      <ul className="text-sm">
        <div className="flex items-center gap-2">
          <Check size={45} className="mb-4 text-blue-500"/>
          <li className="mb-3 text-gray-500">Hand written images work best with clear shapes and labels</li>
        </div>
        <div className="flex items-center gap-2">
          <Check size={45} className="mb-4 text-blue-500"/>
          <li className="mb-3 text-gray-500">We support landing pages, UI screens, and website layouts</li>
        </div>
        <div className="flex items-center gap-2">
          <Check size={45} className="mb-4 text-blue-500"/>
          <li className="mb-0 text-gray-500">We support landing pages, UI screens, and website layouts</li>
        </div>
      </ul>
    </div>
  )

  }