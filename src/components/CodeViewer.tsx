

type Props = {
  code: string | null;
};

export default function CodeViewer({code}: Props) {

  return (

    <div className="h-[65vh] overflow-auto bg-gray-900 text-green-400 p-4 mb-4 rounded-lg text-sm font-mono">
      <pre className="whitespace-pre-wrap">
        <code>{code || "Generated code will appear here"}</code>
      </pre>
    </div>
  )


}