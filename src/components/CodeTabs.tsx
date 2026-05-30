export default function CodeTabs({activeTab, setActiveTab}: {activeTab: string; setActiveTab: (tab: string) => void}) {

  return (
    <div className="flex gap-2 mb-4">
      <button className={`${activeTab === "html" ? "bg-blue-500" : "bg-gray-300"} text-white rounded-lg px-3 py-1 cursor-pointer`} onClick={() => setActiveTab("html")}>
        html
      </button>
      <button className={`${activeTab === "react" ? "bg-blue-500" : "bg-gray-300"} text-white rounded-lg px-3 py-1 cursor-pointer`} onClick={() => setActiveTab("react")}>
        React
      </button>
    </div>
  )
}