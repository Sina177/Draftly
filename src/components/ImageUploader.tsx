"use client";
import { use, useState } from "react";

export default function ImageUploader() {

  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const displayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files![0]));
    setFile(e.target.files![0]);
  };
  return (
    <>
      <div className="bg-blue-500 flex flex-col items-center justify-center min-h-screen">
        <div className="w-64 h-64 mb-4">
          {image && <img className="w-64 h-64 object-cover" src={image} alt="Uploaded Image"/>}
        </div>
        <input className="border rounded-xl bg-blue-300 px-8 py-4" type="file" accept="image/*" onChange={(e) => displayImage(e)}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {
          if (!file) return;
            const formData = new FormData();
            formData.append("image", file);
            const res = await fetch("/api/generate", { method: "POST", body: formData });
            const data = await res.json();
            setCode(data.message.text);
          }}>
          Generate HTML
        </button>
        <div className="max-w-2xl max-h-96 overflow-auto bg-gray-900 text-green-400 p-4 rounded-lg text-sm">
          {code && <pre >{code}</pre>}
        </div>
      </div>
    </>
  )
}