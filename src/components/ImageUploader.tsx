"use client";
import { use, useState } from "react";

export default function Profile() {

  const [image, setImage] = useState<string | null>(null);

  const displayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files![0]));
  };
  return (
    <>
      <p>Hello World!</p>
      <div className="bg-blue-500 flex flex-col items-center justify-center min-h-screen">
        <div className="w-64 h-64 mb-4">
          {image && <img className="w-64 h-64 object-cover" src={image} alt="Uploaded Image"/>}
        </div>
        <input className="border rounded-xl bg-blue-300 px-8 py-4" type="file" accept="image/*" onChange={(e) => displayImage(e)}/>
      </div>
    </>
  )
}