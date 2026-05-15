import ImageUploader from "@/components/ImageUploader";

export default function Home() {
    return (
      <div className="h-screen grid grid-rows-[auto_1fr]">
        {/* Navbar - spans full width */}
        <div className="bg-red-300 p-4">
          Navbar
        </div>

        {/* Main area - 3 columns */}
        <div className="grid grid-cols-[400px_1fr_600px] grid-rows-[1fr_auto]">
          {/* Left sidebar */}
          <div className="bg-green-300 p-4 row-span-2">
            Left Panel
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