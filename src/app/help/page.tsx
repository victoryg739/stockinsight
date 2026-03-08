"use client";
import React, { useState, MouseEvent } from "react";
import { FaChevronUp, FaChevronDown, FaCopy } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  PRESENT_VALUE_OF_FREE_CASH_FLOW,
  COMPANY_ANALYSIS,
  CORPORATE_LIFECYCLE,
  WHEN_TO_SELL,
} from "../utils/helpPageDefinitions";

interface TermDetails {
  definition: string;
  formula?: string;
  example?: string;
}

interface SubSection {
  id: string;
  title: string;
  content: string | Record<string, TermDetails>;
}

interface MainSection {
  id: string;
  title: string;
  content: string;
  subSections?: SubSection[];
  directContent?: Record<string, TermDetails>;
}

interface OpenSections {
  mainSections: Record<string, boolean>;
  subSections: Record<string, boolean>;
  termSections: Record<string, boolean>;
}

interface CopyState {
  id: string | null;
  success: boolean;
}

const mainSections: MainSection[] = [
  {
    id: "investmentPlaybook",
    title: "Investment Playbook",
    content:
      "A systematic approach to investment decision-making, covering the essential steps from initial company analysis through portfolio management and exit strategies.",
    subSections: [
      {
        id: "companyAnalysis",
        title: "Company Analysis (Ask AI)",
        content: COMPANY_ANALYSIS,
      },
      {
        id: "whenToSell",
        title: "When to Sell",
        content: WHEN_TO_SELL,
      },
    ],
  },
  {
    id: "fcffModel",
    title: "FCFF Model",
    content:
      "The Free Cash Flow to Firm (FCFF) model is a discounted cash flow valuation method used to estimate the intrinsic value of a company. It focuses on the cash flows available to all providers of capital after accounting for operating expenses, taxes, and reinvestment needs.",
    subSections: [
      {
        id: "presentValueTerms",
        title: "Present Value of Free Cash Flow Terms",
        content: PRESENT_VALUE_OF_FREE_CASH_FLOW,
      },
    ],
  },
  {
    id: "corporateLifecycle",
    title: "Corporate Lifecycle",
    content:
      "The Corporate Lifecycle model describes the stages a company typically progresses through from inception to maturity or decline. Understanding where a company sits in this lifecycle helps investors assess growth potential, risks, and appropriate valuation methods.",
    directContent: CORPORATE_LIFECYCLE,
  },
];

export default function HelpPage(): React.ReactElement {
  const [openSections, setOpenSections] = useState<OpenSections>({
    mainSections: {},
    subSections: {},
    termSections: {},
  });

  const [copySuccess, setCopySuccess] = useState<CopyState>({ id: null, success: false });

  const toggleSection = (level: keyof OpenSections, sectionId: string): void => {
    setOpenSections((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        [sectionId]: !prev[level][sectionId],
      },
    }));
  };

  const isSectionOpen = (level: keyof OpenSections, sectionId: string): boolean => !!openSections[level][sectionId];

  const handleCopy = (text: string, id: string): void => {
    navigator.clipboard.writeText(text).then(
      (): void => {
        setCopySuccess({ id, success: true });
        setTimeout(() => setCopySuccess({ id: null, success: false }), 2000);
      },
      (err): void => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const renderRichText = (text?: string): React.ReactElement | null => {
    if (!text) return null;

    const htmlText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/__(.*?)__/g, "<u>$1</u>");

    return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
  };

  const renderTermDetails = (term: string, details: TermDetails, sectionType = "terms"): React.ReactElement => {
    const contentToCopy = [
      details.definition,
      details.formula ? `Formula: ${details.formula}` : null,
      details.example ? `Example: ${details.example}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const contentId = `${sectionType}-${term.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div className="p-3 border-t border-gray-200 dark:border-gray-600 dark:text-gray-200" key={contentId}>
        <div className="mb-5 mt-3 relative group">
          <button
            onClick={() => handleCopy(contentToCopy, contentId)}
            className="absolute right-0"
            title="Copy to clipboard"
          >
            <FaCopy size={16} />
          </button>
          {copySuccess.id === contentId && copySuccess.success && (
            <div className="text-green-600 text-sm mt-1">Copied!</div>
          )}
        </div>
        <h4 className="font-semibold mb-2">{term}</h4>
        <div className="space-y-2">
          <div>{renderRichText(details.definition)}</div>
          {details.formula && (
            <div>
              <strong>Formula:</strong> {renderRichText(details.formula)}
            </div>
          )}
          {details.example && (
            <div>
              <strong>Example:</strong> {renderRichText(details.example)}
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Help Center</h1>
          {mainSections.map((section) => (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
              <div
                className="flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                onClick={() => toggleSection("mainSections", section.id)}
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{section.title}</h2>
                {isSectionOpen("mainSections", section.id) ? <FaChevronUp size={20} className="text-gray-500 dark:text-gray-300" /> : <FaChevronDown size={20} className="text-gray-500 dark:text-gray-300" />}
              </div>
              {isSectionOpen("mainSections", section.id) && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                  </div>
                  {section.directContent &&
                    Object.entries(section.directContent).map(([term, details]) => (
                      <div key={term} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <div
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                          onClick={() => toggleSection("termSections", term)}
                        >
                          <h4 className="font-medium text-gray-800 dark:text-white">{term}</h4>
                          {isSectionOpen("termSections", term) ? (
                            <FaChevronUp size={14} className="text-gray-500 dark:text-gray-300" />
                          ) : (
                            <FaChevronDown size={14} className="text-gray-500 dark:text-gray-300" />
                          )}
                        </div>
                        {isSectionOpen("termSections", term) && renderTermDetails(term, details, "checklist")}
                      </div>
                    ))}
                  {section.subSections &&
                    section.subSections.map((sub) => (
                      <div key={sub.id} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mt-4">
                        <div
                          className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                          onClick={() => toggleSection("subSections", sub.id)}
                        >
                          <h3 className="font-medium text-gray-800 dark:text-white">{sub.title}</h3>
                          {isSectionOpen("subSections", sub.id) ? (
                            <FaChevronUp size={16} className="text-gray-500 dark:text-gray-300" />
                          ) : (
                            <FaChevronDown size={16} className="text-gray-500 dark:text-gray-300" />
                          )}
                        </div>
                        {isSectionOpen("subSections", sub.id) && (
                          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                            {typeof sub.content === "string" ? (
                              <p className="text-gray-600 dark:text-gray-300">{sub.content}</p>
                            ) : (
                              Object.entries(sub.content).map(([term, details]) => (
                                <div key={term} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mb-2">
                                  <div
                                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                                    onClick={() => toggleSection("termSections", term)}
                                  >
                                    <h4 className="font-medium text-gray-800 dark:text-white">{term}</h4>
                                    {isSectionOpen("termSections", term) ? (
                                      <FaChevronUp size={14} className="text-gray-500 dark:text-gray-300" />
                                    ) : (
                                      <FaChevronDown size={14} className="text-gray-500 dark:text-gray-300" />
                                    )}
                                  </div>
                                  {isSectionOpen("termSections", term) && renderTermDetails(term, details)}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
