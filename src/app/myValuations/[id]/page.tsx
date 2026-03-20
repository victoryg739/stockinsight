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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdEdit } from "react-icons/md";

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
          <div className="flex justify-center mb-3">
            <button
              onClick={() => router.push(`/fcff?editId=${id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >
              <MdEdit className="h-4 w-4" />
              Edit Valuation
            </button>
          </div>
          <span className="font-bold mr-2">Valued Date: </span>
          {epochToDateTime(valuationQuery.valued_date)}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
            {valuationQuery.tags?.map((tag: string) => {
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
                  {tag.split("|")[0]}
                </span>
              );
            })}
          </div>
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
              <div className="dark:text-gray-200 text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold mb-2 mt-4">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-medium mb-2 mt-3">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-base font-medium mb-1 mt-2">{children}</h4>,
                    p: ({ children }) => <p className="mb-3">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-600">{children}</tr>,
                    th: ({ children }) => <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">{children}</th>,
                    td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{children}</td>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-3 text-gray-600 dark:text-gray-400">{children}</blockquote>,
                    code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 font-mono">{children}</code>,
                    hr: () => <hr className="my-4 border-gray-200 dark:border-gray-600" />,
                  }}
                >
                  {valuationQuery.description}
                </ReactMarkdown>
              </div>
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
