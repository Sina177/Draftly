import clsx from "clsx";
import {Stars} from "lucide-react";



export default function ActionBar({status, generateCode, disabled}: {status: string; generateCode: () => void; disabled: boolean}) {


  return (
    <div className="flex items-center w-full">
      <div className="flex items-center gap-2 flex-1">
        <div className={clsx("w-3 h-3 rounded-full", {
          "bg-green-500": status === "done",
          "bg-gray-400": status === "idle",
          "bg-yellow-500": status === "generating",
          "bg-red-500": status === "error"
        })}></div>
        <p className="text-xs text-gray-500">{status === "done" ? "Done" : status === "generating" ? "Generating..." : status === "error" ? "Error" : status === "idle" ? "Ready" : ""}</p>
      </div>
      
      <button className={clsx("bg-blue-500 text-white text-xs px-65 py-1.5 rounded-md flex items-center", {
        "bg-blue-500 hover:bg-blue-600 cursor-pointer": !disabled,
        "bg-gray-600 opacity-40": disabled
      })}
        onClick={generateCode} disabled={disabled}>
        <Stars className="size-4 mr-2" />
        Get Code
      </button>
    </div>
  )

}