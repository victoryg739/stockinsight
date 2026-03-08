import React from "react";
import { RxCross1 } from "react-icons/rx";

type DeletePopoutPageProps = {
  setIsPopoutOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
};

export default function DeletePopoutPage({ setIsPopoutOpen, handleDelete }: DeletePopoutPageProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[550px] h-[200px] overflow-auto relative border dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold dark:text-white">Delete Confirmation</h2>

          <button
            onClick={() => {
              setIsPopoutOpen(false);
            }}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Delete Button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-800 transition-colors"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
