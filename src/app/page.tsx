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

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

    return (
      <div className="h-screen grid grid-rows-[auto_1fr] font-[family-name:var(--font-inter)]">
        {/* Navbar - spans full width */}
        <TopNav />

        {/* Main area - 3 columns */}
        <div className="grid grid-cols-[0.5fr_1.5fr_1fr] grid-rows-[1fr_auto] min-h-0">
          {/* Left sidebar */}
          <div className="bg-[#D5FFFF] p-4 row-span-2">
            <div className="bg-white p-3 border rounded-lg mb-3 border-gray-200 min-h-[30vh]">
              <p className="mb-3 font-bold">1. Upload an Image</p>
              <UploadZone onFileSelect={(url) => setImage(url)} />
              <OrDivider/>
              <CameraCard onFileSelect={(url) => setImage(url)} />
            </div>
              <TipsList/>
          </div>

          {/* Center */}
          <div className="bg-[#D5FFFF] p-4">
            <div className="bg-white p-3 border rounded-lg mb-3 border-gray-200 h-[78vh]">
              <PreviewPanel image={image} />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="bg-[#D5FFFF] p-4 row-span-2 min-w-0">
            <div className="bg-white p-3 border rounded-lg mb-3 border-gray-200 h-[89vh] min-w-0">
              <p className="mb-3 font-bold">3. Your Code</p>
              <CodeTabs />
              <CodeViewer code={TEST_CODE} />
              <CodeActionBar />
            </div>
          </div>

          {/* Action bar - below center only */}
          <div className="bg-purple-300 p-4">
            Action Bar
          </div>
        </div>
        
      </div>
    );
  }