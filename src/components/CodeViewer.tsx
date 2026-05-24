"use client";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type Props = {
  code: string | null;
};

export default function CodeViewer({code}: Props) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (code) {
      codeToHtml(code.trimStart(), {
        lang: "html",
        theme: "github-dark",
      }).then(setHtml);
    }
  }, [code]);

  return (
    <div
      className="code-viewer h-[65vh] overflow-auto min-w-0 rounded-lg text-xs leading-5 mb-4"
      style={{ backgroundColor: "#24292e" }}
    >
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="p-4 text-gray-500 font-mono">Generated code will appear here</pre>
      )}
    </div>
  );
}
