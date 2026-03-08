"use client";
import React from "react";
import { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchMarketPrice, fetchValuationById } from "@/app/utils/queryAPIFunctions";
import StockInfo from "@/app/components/StockInfo";
import Navbar from "@/app/components/Navbar";
import InputBox from "@/app/components/InputBox";
import PresentValueTable from "@/app/components/PresentValueTable";
import EquityValue from "@/app/components/EquityValue";
import ImpliedValue from "@/app/components/ImpliedValue";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { epochToDateTime } from "@/app/utils/helper";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PresentValuePopoutPage from "@/app/components/PopoutPage/PresentValuePopoutPage";
import ROICTable from "@/app/components/ROICTable";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [presentValuePopup, setPresentValuePopup] = useState(false);

  const [valuationModelLabel, setValuationModelLabel] = useState("");

  const [showMoreInputs, setShowMoreInputs] = useState(false);

  const {
    data: valuationQuery,
    isFetching: valuationIsFetching,
    error,
  } = useQuery({
    queryKey: ["valuation"],
    queryFn: async () => {
      return fetchValuationById(id);
    },
  });

  const { data: marketPriceQuery } = useQuery({
    queryKey: ["marketPrice", valuationQuery?.symbol],
    queryFn: async () => {
      return fetchMarketPrice(valuationQuery.symbol);
    },
    enabled: !!valuationQuery?.symbol,
  });

  const renderMarkdown = (markdown: string) => {
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

    return result;
  };

  if (status === "unauthenticated") {
    return router.push("/"); // Redirect to homepage
  } else if (status === "loading" || valuationIsFetching) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          src="/loading.svg"
          alt="Loading icon"
          height={400}
          width={400}
          className="object-contain mb-4" // Added margin-bottom for spacing
        />
        <p className="font-semibold text-lg text-center mt-5">Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          src="/error.svg"
          alt="Error icon"
          height={500}
          width={500}
          className="object-contain mb-4" // Added margin-bottom for spacing
        />
        <p className="text-red-700 font-medium text-lg text-center mt-5">
          Error retrieving data with this valuation ID
        </p>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 p-4 mt-5">
        <div className="col-span-3 text-center">
          <span className="font-bold mr-2">Valued Date: </span>
          {epochToDateTime(valuationQuery.valued_date)}
          {valuationQuery.tags && valuationQuery.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {valuationQuery.tags.map((tag: string) => {
                const styleMap: Record<string, string> = {
                  "Base Case":    "bg-blue-100 text-blue-700 border-blue-200",
                  "Bull Case":    "bg-green-100 text-green-700 border-green-200",
                  "Bear Case":    "bg-red-100 text-red-700 border-red-200",
                  "Conservative": "bg-amber-100 text-amber-700 border-amber-200",
                  "Aggressive":   "bg-purple-100 text-purple-700 border-purple-200",
                };
                return (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${styleMap[tag] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-span-3 row-start-2 text-sm text-gray-500 dark:text-gray-400 italic text-right">
          Note: All data are snapshots except for the Current Price
        </div>
      </div>
      <div
        className="mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
      >
        <StockInfo stockInfo={valuationQuery.stock_info} searchedSymbol={valuationQuery.symbol} />
      </div>
      <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider dark:text-white">Inputs</div>
      {/* Container */}
      <div
        className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
      >
        <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10 ">
          {valuationQuery.inputs.map((input: any, index: number) => (
            <InputBox
              key={input.id}
              id={input.id}
              label={input.label}
              value={input.value}
              question={input.question}
              unit={input.unit}
              // onChange={(e) => handleInputChange(input.id, e.target.value, "inputs")}
              firstElement={index === 0}
            />
          ))}
        </div>
        {/* Show More button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowMoreInputs((prevState) => !prevState)}
            className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 px-3 rounded"
          >
            <div className="flex items-center">
              {showMoreInputs ? "Show Less" : "Show More"}
              {showMoreInputs ? <RiArrowDropUpLine className="ml-1" /> : <RiArrowDropDownLine className="ml-1" />}
            </div>
          </button>
        </div>

        {/* Fetched Inputs */}
        {showMoreInputs && (
          <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10 mt-10">
            {valuationQuery.fetched_inputs.map((input: any) => (
              <InputBox
                key={input.id}
                id={input.id}
                label={input.label}
                value={input.value}
                question={input.question}
                unit={input.unit}
                // onChange={(e) => handleInputChange(input.id, e.target.value, "fetchedInputs")}
              />
            ))}
          </div>
        )}
        {/*Valuation Header */}
        <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider dark:text-white">Valuation</div>
        {/* Container */}
        <div
          className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
        >
          <div className="flex flex-col items-center mb-14 mt-10">
            <h2 className="font-medium text-xl mb-4 text-gray-700 dark:text-gray-200">Present Value of Free Cash Flow</h2>
            <div className="w-full max-w h-0.5 bg-gray-200 dark:bg-gray-600"></div>
          </div>
          <PresentValueTable
            data={valuationQuery.valuation_model}
            setIsPopoutOpen={setPresentValuePopup}
            setValuationModelLabel={setValuationModelLabel}
          />

          <div className="flex flex-col items-center mb-14 mt-10">
            <h2 className="font-medium text-xl mb-4 text-gray-700 dark:text-gray-200">Return on Invested Capital</h2>
            <div className="w-full max-w h-0.5 bg-gray-200 dark:bg-gray-600"></div>
          </div>
          <ROICTable data={valuationQuery.roic_data} />
          <div className="flex flex-col items-center mb-14 mt-10">
            <h2 className="font-medium text-xl mb-4 text-gray-700 dark:text-gray-200">Equity Value</h2>
            <div className="w-full max-w h-0.5 bg-gray-200 dark:bg-gray-600"></div>
          </div>
          <EquityValue data={valuationQuery.valuation_output} />
          <ImpliedValue
            title={valuationQuery.symbol}
            value={Number(valuationQuery.implied_share_price)}
            currentPrice={marketPriceQuery}
          />
        </div>
        {valuationQuery.description && (
          <>
            {/*Description Header */}
            <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider dark:text-white">Your Analysis</div>
            {/* Container */}
            <div
              className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
            >
              <div className="markdown-content dark:text-gray-200">{renderMarkdown(valuationQuery.description)}</div>{" "}
            </div>
          </>
        )}
      </div>
      {presentValuePopup && (
        <PresentValuePopoutPage
          setIsPopoutOpen={setPresentValuePopup}
          data={valuationQuery.valuation_model}
          valuationModelLabel={valuationModelLabel} //key to identify which chart to show first
          searchedSymbol={valuationQuery.symbol}
          stockInfo={valuationQuery.stock_info}
        />
      )}
    </div>
  );
}
