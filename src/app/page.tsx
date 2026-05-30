"use client";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import UploadZone from "@/components/UploadZone";
import OrDivider from "@/components/OrDivider";
import CameraCard from "@/components/CameraCard";
import TipsList from "@/components/TipsList";
import PreviewPanel from "@/components/PreviewPanel";
import CodeTabs from "@/components/CodeTabs";
import CodeViewer from "@/components/CodeViewer";
import CodeActionBar from "@/components/CodeActionBar";

import { TEST_CODE } from "./test/testCode";
import ActionBar from "@/components/ActionBar";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("html");

  const handleFileSelect = (f: File) => {
    setFile(f);
    setImage(URL.createObjectURL(f));
  };

  const generateCode = async () => {
    if (!file) return;
    setStatus("generating");
    try {
      const formData = new FormData();
      formData.append("format", activeTab);
      formData.append("image", file);
      const res = await fetch("/api/generate", { method: "POST", body: formData });
      const data = await res.json();
      setCode(data.message.text);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

    return (
      <div className="h-screen grid grid-rows-[auto_1fr] font-[family-name:var(--font-inter)]">
        {/* Navbar - spans full width */}
        <TopNav />

        {/* Main area - 3 columns */}
        <div className="grid grid-cols-[0.5fr_1.5fr_1fr] grid-rows-[0.9fr_auto] min-h-0">
          {/* Left sidebar */}
          <div className="bg-[#D5FFFF] p-4 row-span-2">
            <div className="bg-white p-3 border rounded-lg mb-3 border-gray-200 min-h-[30vh]">
              <p className="mb-3 font-bold">1. Upload an Image</p>
              <UploadZone onFileSelect={handleFileSelect} />
              <OrDivider/>
              <CameraCard onFileSelect={handleFileSelect} />
            </div>
              <TipsList/>
          </div>

          {/* Center */}
          <div className="bg-[#D5FFFF] p-4">
            <div className="bg-white p-3 border rounded-lg mb-0 border-gray-200 h-[78vh]">
              <PreviewPanel image={image} />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="bg-[#D5FFFF] p-4 row-span-2 min-w-0">
            <div className="bg-white p-3 border rounded-lg mb-3 border-gray-200 h-[89vh] min-w-0">
              <p className="mb-3 font-bold">3. Your Code</p>
              <CodeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <CodeViewer code={code} language={activeTab === "react" ? "tsx" : "html"} />
              <CodeActionBar />
            </div>
          </div>

          {/* Action bar - below center only */}
          <div className="bg-[#D5FFFF] p-4 pt-0">
            <div className="bg-white p-3 border rounded-lg border-gray-200 h-[8vh] flex items-center">
              <ActionBar status={status} generateCode={generateCode} disabled={!file || status === "generating"} />
            </div>
          </div>
        </div>
        
      </div>
    );
  }