import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ options, value, onChange, defaultOption, label }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultOption);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue(defaultOption);
    }
  }, [value, defaultOption]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="mr-6 relative w-56">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative mt-1">
        <button
          type="button"
          className="w-full bg-white border border-black rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">{selectedValue}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex="-1"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option}
                className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 ${
                  selectedValue === option ? "bg-blue-50 text-blue-900" : "text-gray-900"
                }`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={selectedValue === option}
              >
                <span className="block truncate">{option}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
