import React from "react";
import Tooltip from "rc-tooltip";
import ReactMarkdown from "react-markdown";
import { FaRegQuestionCircle } from "react-icons/fa";
import "rc-tooltip/assets/bootstrap.css";

interface CustomTooltipProps {
  content: string;
  placement?: "top" | "right" | "left" | "bottom";
  children?: React.ReactNode;
}

const mdComponents = {
  h2: ({ children }: any) => (
    <h2 className="text-xs font-bold text-blue-300 uppercase tracking-wide mt-3 mb-1 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xs font-semibold text-slate-300 mt-2 mb-1">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-xs text-slate-200 mb-2 leading-relaxed last:mb-0">{children}</p>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-slate-300">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="bg-slate-700 rounded px-1 py-0.5 text-xs text-amber-300 font-mono">
      {children}
    </code>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc pl-4 mb-2 space-y-0.5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal pl-4 mb-2 space-y-0.5 last:mb-0">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="text-xs text-slate-200 leading-relaxed">{children}</li>
  ),
  hr: () => <hr className="border-slate-600 my-2" />,
};

const TooltipOverlay = ({ content }: { content: string }) => (
  <div className="w-72 bg-slate-900 text-slate-100 p-4 rounded-lg shadow-xl border border-slate-700">
    <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
  </div>
);

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  placement = "right",
  children,
}) => {
  if (!content) return null;

  const trigger = children ?? (
    <span className="ml-2 inline-flex items-center cursor-pointer text-gray-400 hover:text-blue-400 transition-colors duration-150">
      <FaRegQuestionCircle size={18} />
    </span>
  );

  return (
    <Tooltip
      placement={placement}
      overlay={<TooltipOverlay content={content} />}
      overlayStyle={{ maxWidth: "none" }}
    >
      <span className="inline-flex items-center">{trigger}</span>
    </Tooltip>
  );
};

export default CustomTooltip;
