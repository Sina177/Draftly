import ImageUploader from "@/components/ImageUploader";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import UploadZone from "@/components/UploadZone";
import OrDivider from "@/components/OrDivider";
import CameraCard from "@/components/CameraCard";

export default function Home() {
    return (
      <div className="h-screen grid grid-rows-[auto_1fr]">
        {/* Navbar - spans full width */}
        <TopNav />

        {/* Main area - 3 columns */}
        <div className="grid grid-cols-[0.5fr_1.5fr_1fr] grid-rows-[1fr_auto]">
          {/* Left sidebar */}
          <div className="bg-blue-100 p-4 row-span-2">
            <UploadZone/>
            <OrDivider/>
            <CameraCard/>
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