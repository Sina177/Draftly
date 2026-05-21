import ImageUploader from "@/components/ImageUploader";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import UploadZone from "@/components/UploadZone";
import OrDivider from "@/components/OrDivider";
import CameraCard from "@/components/CameraCard";
import TipsList from "@/components/TipsList";

export default function Home() {
    return (
      <div className="h-screen grid grid-rows-[auto_1fr]">
        {/* Navbar - spans full width */}
        <TopNav />

        {/* Main area - 3 columns */}
        <div className="grid grid-cols-[0.5fr_1.5fr_1fr] grid-rows-[1fr_auto] min-h-0">
          {/* Left sidebar */}
          <div className="bg-[#D5FFFF] p-4 row-span-2">
            <div className="bg-white p-3 border rounded-lg mb-3 border-gray-200 min-h-[30vh]">
              <p className="mb-3 font-bold">1. Upload an Image</p>
              <UploadZone/>
              <OrDivider/>
              <CameraCard/>
            </div>
              <TipsList/>
          </div>

          {/* Center */}
          <div className="bg-yellow-300 p-4">
            Center
          </div>

          {/* Right sidebar */}
          <div className="bg-blue-300 p-4 row-span-2">
            Right Panel
          </div>

          {/* Action bar - below center only */}
          <div className="bg-purple-300 p-4">
            Action Bar
          </div>
        </div>
        
      </div>
    );
  }