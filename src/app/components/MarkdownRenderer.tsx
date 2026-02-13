import React from "react";

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, className = "" }) => {
  if (!markdown) return null;

  // Split the content into lines
  const lines = markdown.split("\n");
  const result: React.ReactElement[] = [];

  let currentList: string[] = [];
  let currentListType: "ordered" | "unordered" | null = null;

  // Process each line and convert to JSX
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if the line is part of a list
    const orderedListMatch = line.match(/^\s*(\d+)\.\s(.+)$/);
    const unorderedListMatch = line.match(/^\s*[-*]\s(.+)$/);

    // Handle ordered list items
    if (orderedListMatch) {
      if (currentListType !== "ordered" && currentList.length) {
        // We were in a different type of list, so finalize the previous list
        if (currentListType === "unordered") {
          result.push(
            <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        currentList = [];
      }

      currentListType = "ordered";
      currentList.push(orderedListMatch[2]);
    }
    // Handle unordered list items
    else if (unorderedListMatch) {
      if (currentListType !== "unordered" && currentList.length) {
        // We were in a different type of list, so finalize the previous list
        if (currentListType === "ordered") {
          result.push(
            <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item}
                </li>
              ))}
            </ol>
          );
        }
        currentList = [];
      }

      currentListType = "unordered";
      currentList.push(unorderedListMatch[1]);
    }
    // Handle non-list content
    else {
      // If we were in a list, finalize it
      if (currentList.length) {
        if (currentListType === "ordered") {
          result.push(
            <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item}
                </li>
              ))}
            </ol>
          );
        } else {
          result.push(
            <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        currentList = [];
        currentListType = null;
      }

      // Handle headers - check for each header style
      if (line.trim().startsWith("# ")) {
        result.push(
          <h1 key={`h1-${i}`} className="text-2xl font-bold mb-3">
            {line.trim().substring(2)}
          </h1>
        );
      } else if (line.trim().startsWith("## ")) {
        result.push(
          <h2 key={`h2-${i}`} className="text-xl font-semibold mt-4 mb-2">
            {line.trim().substring(3)}
          </h2>
        );
      } else if (line.trim().startsWith("### ")) {
        result.push(
          <h3 key={`h3-${i}`} className="text-lg font-medium mt-4 mb-2">
            {line.trim().substring(4)}
          </h3>
        );
      }
      // Handle empty lines
      else if (line.trim() === "") {
        result.push(<br key={`br-${i}`} />);
      }
      // Regular paragraph
      else {
        result.push(
          <p key={`p-${i}`} className="mb-2">
            {line}
          </p>
        );
      }
    }
  }

  // If we have any remaining list items at the end, finalize that list
  if (currentList.length) {
    if (currentListType === "ordered") {
      result.push(
        <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-4">
          {currentList.map((item, idx) => (
            <li key={idx} className="mb-1">
              {item}
            </li>
          ))}
        </ol>
      );
    } else {
      result.push(
        <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-4">
          {currentList.map((item, idx) => (
            <li key={idx} className="mb-1">
              {item}
            </li>
          ))}
        </ul>
      );
    }
  }

  return <div className={`markdown-content ${className}`}>{result}</div>;
};

export default MarkdownRenderer;
