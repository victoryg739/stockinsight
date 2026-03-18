import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  options: string[];
  value?: string;
  onChange: (option: string) => void;
  defaultOption?: string;
  label: string;
}

const Dropdown = ({ options, value, onChange, defaultOption, label }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultOption);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const filtered = options.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredOptions(filtered);
  }, [searchQuery, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className="mr-6 relative w-56">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>

      <div className="relative mt-1">
        <div
          data-testid={`dropdown-${label}`}
          className="w-full bg-white dark:bg-gray-700 border border-gray-400 dark:border-gray-500 rounded-md py-2 px-3 pr-8 cursor-pointer"
          onClick={handleOpen}
        >
          {isOpen ? (
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          ) : (
            <span className="block truncate text-gray-900 dark:text-gray-100">{selectedValue}</span>
          )}
        </div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </span>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black dark:ring-gray-600 ring-opacity-5 overflow-auto sm:text-sm"
            role="listbox"
          >
            {filteredOptions.map((option) => (
              <li
                key={option}
                className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 dark:hover:bg-blue-900/40 ${
                  selectedValue === option
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300"
                    : "text-gray-900 dark:text-gray-100"
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
