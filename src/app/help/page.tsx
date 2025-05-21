"use client";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown, FaCopy } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  PRESENT_VALUE_OF_FREE_CASH_FLOW,
  INVESTMENT_CHECKLIST,
  CORPORATE_LIFECYCLE,
} from "../utils/helpPageDefinitions";
import ReactMarkdown from "react-markdown";

export default function HelpPage() {
  // More scalable state structure to handle multiple levels of nested sections
  const [openSections, setOpenSections] = useState({
    mainSections: {}, // Top-level sections
    subSections: {}, // Second-level sections
    termSections: {}, // Third-level sections (individual terms)
  });

  // State to track copy success message
  const [copySuccess, setCopySuccess] = useState({
    id: null,
    success: false,
  });

  // Generic toggle function for any section at any level
  const toggleSection = (level, sectionId) => {
    setOpenSections((prev) => {
      const sectionLevel = { ...prev[level] };
      sectionLevel[sectionId] = !sectionLevel[sectionId];
      return { ...prev, [level]: sectionLevel };
    });
  };

  // Check if a section is open
  const isSectionOpen = (level, sectionId) => {
    return !!openSections[level][sectionId];
  };

  // Function to handle copying text to clipboard
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Show success message
        setCopySuccess({
          id,
          success: true,
        });
        // Clear success message after 2 seconds
        setTimeout(() => {
          setCopySuccess({
            id: null,
            success: false,
          });
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Main sections data structure - makes it easy to add more sections later
  const mainSections = [
    {
      id: "investmentChecklist",
      title: "Investment Checklist",
      content:
        "A comprehensive set of criteria to evaluate when considering an investment in a company. These checklists help ensure you've covered key aspects of the business before making an investment decision.",
      directContent: INVESTMENT_CHECKLIST,
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
        // Can easily add more sub-sections here
      ],
    },

    {
      id: "corporateLifecycle",
      title: "Corporate Lifecycle",
      content:
        "The Corporate Lifecycle model describes the stages a company typically progresses through from inception to maturity or decline. Understanding where a company sits in this lifecycle helps investors assess growth potential, risks, and appropriate valuation methods.",
      directContent: CORPORATE_LIFECYCLE,
    },
    // Can easily add more main sections here
  ];

  const renderRichText = (text) => {
    if (!text) return null;

    // First, handle bold: **text** -> <strong>text</strong>
    let htmlText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Second, handle underline: __text__ -> <u>text</u>
    // We use a different delimiter to avoid conflicts with bold
    htmlText = htmlText.replace(/__(.*?)__/g, "<u>$1</u>");

    return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
  };

  const renderTermDetails = (term, details, sectionType = "terms") => {
    const contentToCopy =
      details.definition +
      (details.formula ? "\n\nFormula: " + details.formula : "") +
      (details.example ? "\n\nExample: " + details.example : "");

    const contentId = `${sectionType}-${term.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div className="p-3 border-t border-gray-200">
        <div className="mb-5 mt-3 relative group">
          {/* Copy button */}
          <button
            onClick={() => handleCopy(contentToCopy, contentId)}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 transition-colors p-2"
            title="Copy to clipboard"
          >
            <FaCopy size={16} />
          </button>

          {/* Success message */}
          {copySuccess.id === contentId && copySuccess.success && (
            <div className="absolute right-0 top-0 mt-10 bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
              Copied!
            </div>
          )}

          {/* Use renderRichText for the definition */}
          <p className="text-gray-700 whitespace-pre-line leading-7 pr-10">{renderRichText(details.definition)}</p>
        </div>
        {details.formula && (
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-500 mb-1">Formula:</h5>
            <div className="bg-gray-50 p-2 rounded font-mono text-sm whitespace-pre-line">
              {/* Use renderRichText for the formula */}
              {renderRichText(details.formula)}
            </div>
          </div>
        )}
        {details.example && (
          <div>
            <h5 className="text-sm font-medium text-gray-500 mb-1">Example:</h5>
            <p className="text-gray-700 whitespace-pre-line">
              {/* Use renderRichText for the example */}
              {renderRichText(details.example)}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Help Center</h1>

          {/* Dynamically render all main sections */}
          {mainSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
              {/* Main section header */}
              <div
                className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("mainSections", section.id)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                {isSectionOpen("mainSections", section.id) ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </div>

              {/* Main section content */}
              {isSectionOpen("mainSections", section.id) && (
                <div className="p-6 border-t border-gray-200">
                  <div className="mb-6">
                    <p className="text-gray-600">{section.content}</p>
                  </div>

                  {/* Display direct content for Investment Checklist */}
                  {section.directContent && (
                    <div className="space-y-4">
                      {Object.entries(section.directContent).map(([term, details]) => (
                        <div key={term} className="border border-gray-200 rounded-lg overflow-hidden">
                          {/* Term header */}
                          <div
                            className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                            onClick={() => toggleSection("termSections", term)}
                          >
                            <h4 className="font-medium text-gray-800">{term}</h4>
                            {isSectionOpen("termSections", term) ? (
                              <FaChevronUp size={14} />
                            ) : (
                              <FaChevronDown size={14} />
                            )}
                          </div>

                          {/* Term details */}
                          {isSectionOpen("termSections", term) && renderTermDetails(term, details, "checklist")}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render sub-sections if they exist */}
                  {section.subSections &&
                    section.subSections.map((subSection) => (
                      <div key={subSection.id} className="border border-gray-200 rounded-lg overflow-hidden mt-4">
                        {/* Sub-section header */}
                        <div
                          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                          onClick={() => toggleSection("subSections", subSection.id)}
                        >
                          <h3 className="font-medium text-gray-800">{subSection.title}</h3>
                          {isSectionOpen("subSections", subSection.id) ? (
                            <FaChevronUp size={16} />
                          ) : (
                            <FaChevronDown size={16} />
                          )}
                        </div>

                        {/* Sub-section content */}
                        {isSectionOpen("subSections", subSection.id) && (
                          <div className="p-4 border-t border-gray-200">
                            {typeof subSection.content === "string" ? (
                              <p className="text-gray-600">{subSection.content}</p>
                            ) : (
                              // For Present Value Terms or Checklist, render the dictionary of terms
                              <div className="space-y-4">
                                {Object.entries(subSection.content).map(([term, details]) => {
                                  // Determine the section type for proper ID generation when copying
                                  const sectionType = subSection.id === "checklistItems" ? "checklist" : "terms";

                                  return (
                                    <div key={term} className="border border-gray-200 rounded-lg overflow-hidden">
                                      {/* Term header */}
                                      <div
                                        className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                                        onClick={() => toggleSection("termSections", term)}
                                      >
                                        <h4 className="font-medium text-gray-800">{term}</h4>
                                        {isSectionOpen("termSections", term) ? (
                                          <FaChevronUp size={14} />
                                        ) : (
                                          <FaChevronDown size={14} />
                                        )}
                                      </div>

                                      {/* Term details */}
                                      {isSectionOpen("termSections", term) &&
                                        renderTermDetails(term, details, sectionType)}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-12 text-center text-gray-500 text-sm"></div>
        </div>
      </div>
    </>
  );
}
