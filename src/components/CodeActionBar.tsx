import {Copy, Download, RefreshCcw} from "lucide-react";

export default function CodeActionBar({code, generateCode}: {code: string | null, generateCode: () => void}) {


  return (
    <div className="flex justify-center gap-2">
      <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={() => {
        if (!code) return;
        navigator.clipboard.writeText(code);
      }}>
        <Copy size={16} />
        Copy
      </button>
      <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={() => {
        if (!code) return;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "code.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }}>
        <Download size={16} />
        Download
      </button>
      <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={generateCode}>
        <RefreshCcw size={16} />
        Regenerate
      </button>
    </div>
  )

}