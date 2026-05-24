import {Copy, Download, RefreshCcw} from "lucide-react";

export default function CodeActionBar() {


  return (
    <div className="flex justify-center gap-2">
      <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
        <Copy size={16} />
        Copy
      </button>
      <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
        <Download size={16} />
        Download
      </button>
      <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
        <RefreshCcw size={16} />
        Regenerate
      </button>
    </div>
  )

}