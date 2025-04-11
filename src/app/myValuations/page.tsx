"use client";
import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useMutation, useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchValuations, deleteValuationById, fetchMarketPrice } from "../utils/queryAPIFunctions";
import { epochToDateTime } from "../utils/helper";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import DeletePopoutPage from "../components/PopoutPage/DeletePopoutPage";
import Image from "next/image";
import { FaArrowUp, FaDollarSign } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { MdDiamond } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [symbol, setSymbol] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deletePage, setDeletePage] = useState(false);
  const queryClient = useQueryClient();
  const valuationCalcuation = (marketPrice: any, impliedPrice: any) => {
    return Math.abs((impliedPrice / marketPrice - 1) * 100).toFixed(2);
  };

  const { data: valuationQuery, isFetching: valuationIsFetching } = useQuery({
    queryKey: ["valuations", symbol], // Include symbol in the queryKey
    queryFn: async () => {
      return fetchValuations(symbol);
    },
  });

  const marketPriceQueries = useQueries({
    queries: (valuationQuery || []).map((item: any) => ({
      queryKey: ["marketPrice", item.symbol],
      queryFn: () => fetchMarketPrice(item.symbol),
      enabled: !!item.symbol,
    })) as { queryKey: [string, string]; queryFn: () => Promise<number | null> }[],
  });

  const deleteValuationMutation = useMutation({
    mutationFn: async (ids: any) => {
      await deleteValuationById(ids);
    },
  });

  function truncateDescription(description: string, maxLength = 50) {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const handleDelete = () => {
    deleteValuationMutation.mutate(selectedItems, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        setSelectedItems([]); // Clear selected items after successful deletion
      },
    });
    setDeletePage(false);
  };

  const handleMoreDetails = (e: any, id: string) => {
    e.preventDefault();
    router.push(`/myValuations/${id}`);
  };

  if (status === "unauthenticated") {
    return router.push("/"); // Redirect to homepage
  } else if (status === "loading") {
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
  }

  return (
    <div>
      <Navbar />
      <div className="relative overflow-x-auto sm:rounded-lg mx-10">
        <div className="pb-4 my-10 flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for ticker"
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className="flex px-5 py-2 items-center bg-red-700 hover:bg-red-800 text-white rounded-lg">
            <MdDeleteOutline className="mr-2" />
            <button className="text-white" onClick={() => setDeletePage(true)}>
              Delete
            </button>
          </div>
        </div>
        {valuationIsFetching ? (
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
        ) : valuationQuery && valuationQuery.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-sm font-medium bg-gray-50">
              <tr>
                <th scope="col" className="px-1 py-3 whitespace-nowrap min-w-[180px]">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <span className="flex items-center">
                    <FaDollarSign className="mr-1" />
                    Market Price
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <span className="flex items-center">
                    <MdDiamond className="mr-1" />
                    Implied Price
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <span className="flex items-center">
                    <MdOutlineDescription className="mr-1" />
                    Description
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <span className="flex items-center">
                    <MdOutlineDateRange className="mr-1" />
                    Valuation Date
                  </span>
                </th>
                <th scope="col" className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {valuationQuery.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-stone-200 cursor-pointer"
                  onClick={(e) => {
                    // Prevent triggering the click when interacting with specific elements
                    if (!(e.target instanceof HTMLInputElement)) {
                      handleMoreDetails(e, item.id);
                    }
                  }}
                >
                  <td className="px-1 py-6 font-bold grid grid-cols-[auto_1fr] gap-x-3 min-w-[180px]">
                    <Image
                      src={`https://img.logo.dev/ticker/${item.symbol}?token=${process.env.NEXT_PUBLIC_LOGODEV}&retina=true`}
                      alt="logo"
                      height={128}
                      width={128}
                      className="row-span-2 aspect-square object-contain h-8 w-8 lg:h-10 lg:w-10"
                    />
                    <div className="col-start-2">{item.stock_info[0].value}</div>
                    <div className="col-start-2">{item.symbol}</div>
                  </td>
                  <td className="px-6 py-6 ">${marketPriceQueries[index].data}</td>
                  <td className="px-6 py-6 ">
                    ${item.implied_share_price}
                    {marketPriceQueries[index].data && (
                      <div className="mt-1">
                        {item.implied_share_price > marketPriceQueries[index].data ? (
                          <div className="bg-green-300 text-green-800 text-center rounded-lg flex items-center justify-center py-1 px-2">
                            <FaArrowUp className="mr-1" />
                            <span>
                              {valuationCalcuation(marketPriceQueries[index].data, item.implied_share_price)}%
                            </span>
                            <span className="ml-1"> Undervalued </span>
                          </div>
                        ) : (
                          <div className="bg-red-200 text-red-800 text-center rounded-lg flex items-center justify-center py-1 px-2">
                            <FaArrowDown className="mr-1" />
                            <span>
                              {valuationCalcuation(marketPriceQueries[index].data, item.implied_share_price)}%
                            </span>
                            <span className="ml-1">Overvalued</span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-6 ">{truncateDescription(item.description)}</td>
                  <td className="px-6 py-6 ">{epochToDateTime(item.valued_date)}</td>
                  <td className="w-4 px-3 py-6">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${index}`}
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data available. Please enter a stock symbol.</div>
        )}
      </div>
      {deletePage && <DeletePopoutPage setIsPopoutOpen={setDeletePage} handleDelete={handleDelete} />}
    </div>
  );
}
