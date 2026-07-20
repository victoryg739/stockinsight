"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { buildValuationPrompt, type ValuationPromptParams } from "../utils/llmPrompt";

/**
 * Copies an LLM-ready prompt to the clipboard asking for suggested values for
 * the 7 driver inputs (growth, margins, sales-to-capital). The user pastes it
 * into the LLM of their choice.
 */
const CopyLlmPromptButton: React.FC<ValuationPromptParams> = (props) => {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    const prompt = buildValuationPrompt(props);
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      // Clipboard API can be unavailable (http, older browsers) — fall back
      // to a hidden textarea + execCommand copy.
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 py-2 px-3 rounded text-white transition-colors ${
          copied
            ? "bg-green-700 hover:bg-green-600"
            : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600"
        }`}
        title="Copy a prompt for ChatGPT/Claude/Gemini that asks for suggested values for the growth, margin and sales-to-capital inputs"
      >
        {copied ? <FiCheck /> : <FiCopy />}
        {copied ? "Prompt Copied!" : "Copy AI Prompt"}
      </button>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Paste into an LLM to get suggested input values
      </span>
    </div>
  );
};

export default CopyLlmPromptButton;
