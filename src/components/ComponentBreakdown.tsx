import { Trash2 } from "lucide-react";

export default function ComponentBreakdown({components, setComponents}: {components: { name: string; description: string }[]; setComponents: (components: { name: string; description: string }[]) => void}) {

  const updateComponent = (idx: number, field: string, value: string) => {
    const newComponents = [...components];
    newComponents[idx] = { ...newComponents[idx], [field]: value };
    setComponents(newComponents);
  };
  const deleteComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col">
      <p className="mb-3 font-bold">2. Review Components</p>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {components.map((comp, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex-1 space-y-2">
              <input
                value={comp.name}
                onChange={(e) => updateComponent(idx, "name", e.target.value)}
                className="w-full px-2 py-1 text-sm font-semibold border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={comp.description}
                onChange={(e) => updateComponent(idx, "description", e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
              />
            </div>
            <button onClick={() => deleteComponent(idx)} className="text-gray-400 hover:text-red-500 mt-1 cursor-pointer">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

}
