import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

export default function SaveValuationPopoutPage({
  setIsPopoutOpen,
  symbol,
  email,
  inputs,
  fetchedInputs,
  stockInfo,
  valuationModel,
  valuationOutput,
  impliedSharePrice,
  mutation,
}: any) {
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const nowEpochSeconds = Math.floor(Date.now() / 1000);
    const data = {
      symbol,
      email,
      inputs,
      fetchedInputs,
      stockInfo,
      valuationModel,
      valuationOutput,
      impliedSharePrice,
      description,
      valuedDate: nowEpochSeconds,
    };

    mutation.mutate(data);
    setIsPopoutOpen(false); // Close the popout after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[650px] h-[400px] overflow-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Save Valuation</h2>

          <button
            onClick={() => {
              setIsPopoutOpen(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Description Box */}
        <textarea
          className="w-full h-48 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Enter your story for your valuation here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Save Button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
