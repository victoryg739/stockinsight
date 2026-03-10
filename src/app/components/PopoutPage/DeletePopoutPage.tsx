import React from "react";
import { RxCross1 } from "react-icons/rx";

type DeletePopoutPageProps = {
  setIsPopoutOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
};

export default function DeletePopoutPage({ setIsPopoutOpen, handleDelete }: DeletePopoutPageProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[480px] relative border dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Delete</h2>
          <button
            onClick={() => setIsPopoutOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsPopoutOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
