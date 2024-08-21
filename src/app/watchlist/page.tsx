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
import DeletePopoutPage from "../components/DeletePopoutPage";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

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
    // Here you can implement the logic to delete the selected items.
    console.log("Deleting items with IDs:", selectedItems);
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
    router.push(`/watchlist/${id}`);
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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">
                  Ticker
                </th>
                <th scope="col" className="px-6 py-3">
                  Market Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Implied Price
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  Valuation Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {valuationQuery.map((item: any, index: number) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 px-3 py-6">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${index}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{item.symbol}</td>
                  <td className="px-6 py-4">${marketPriceQueries[index].data}</td>
                  <td className="px-6 py-4">
                    ${item.implied_share_price}
                    {marketPriceQueries[index].data && item.implied_share_price > marketPriceQueries[index].data ? (
                      <div className="bg-green-300 text-green-800 text-center rounded-lg flex items-center justify-center p-1 mt-1">
                        <FaArrowUp className="mr-1" />
                        {valuationCalcuation(marketPriceQueries[index].data, item.implied_share_price)}%
                      </div>
                    ) : (
                      <div className="bg-red-200 text-red-800 text-center rounded-lg flex items-center justify-center p-1 mt-1">
                        <FaArrowDown className="mr-1" />
                        {valuationCalcuation(marketPriceQueries[index].data, item.implied_share_price)}%
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{truncateDescription(item.description)}</td>
                  <td className="px-6 py-4">{epochToDateTime(item.valued_date)}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-800 text-white px-2 py-1 rounded-2xl text-sm"
                      onClick={(e) => handleMoreDetails(e, item.id)}
                    >
                      More Details
                    </button>
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
