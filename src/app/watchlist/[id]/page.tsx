"use client";
import React from "react";
import { useState } from "react";
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

export default function Page({ params }: any) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showMoreInputs, setShowMoreInputs] = useState(false);

  const {
    data: valuationQuery,
    isFetching: valuationIsFetching,
    error,
  } = useQuery({
    queryKey: ["valuation"],
    queryFn: async () => {
      return fetchValuationById(params.id);
    },
  });

  const { data: marketPriceQuery } = useQuery({
    queryKey: ["marketPrice"],
    queryFn: async () => {
      return fetchMarketPrice(valuationQuery.symbol);
    },
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
          <span className="font-bold">Valued Date: </span>
          {epochToDateTime(valuationQuery.valued_date)}
        </div>

        <div className="col-span-3 row-start-2 text-sm text-gray-500 italic text-right">
          Note: All data are snapshots except for the Current Price
        </div>
      </div>
      <div
        className=" mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
      >
        <StockInfo stockInfo={valuationQuery.stock_info} />
      </div>
      <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Inputs</div>
      {/* Container */}
      <div
        className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
      >
        <div className="grid grid-cols-3 place-items-center gap-y-10 ">
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
            className="bg-black hover:bg-gray-700 text-white py-2 px-3 rounded"
          >
            <div className="flex items-center">
              {showMoreInputs ? "Show Less" : "Show More"}
              {showMoreInputs ? <RiArrowDropUpLine className="ml-1" /> : <RiArrowDropDownLine className="ml-1" />}
            </div>
          </button>
        </div>

        {/* Fetched Inputs */}
        {showMoreInputs && (
          <div className="grid grid-cols-3 place-items-center gap-y-10 mt-10">
            {valuationQuery.inputs.map((input: any) => (
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
        <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Valuation</div>
        {/* Container */}
        <div
          className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
        >
          <div className="flex flex-col items-center mb-14 mt-10">
            <h2 className="font-medium text-xl mb-4 text-gray-700">Present Value of Free Cash Flow</h2>
            <div className="w-full max-w h-0.5 bg-gray-100"></div>
          </div>
          <PresentValueTable data={valuationQuery.valuation_model} />
          <div className="flex flex-col items-center mb-14 mt-10">
            <h2 className="font-medium text-xl mb-4 text-gray-700">Equity Value</h2>
            <div className="w-full max-w h-0.5 bg-gray-100"></div>
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
            <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Description</div>
            {/* Container */}
            <div
              className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
            >
              <p className="leading-relaxed whitespace-pre-wrap">{valuationQuery.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
