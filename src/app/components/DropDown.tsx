import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const filtered = options.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredOptions(filtered);
  }, [searchQuery, options]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
    setSearchQuery(""); // Reset search after selection
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="mr-6 relative w-56">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative mt-1">
        <button
          type="button"
          className="w-full bg-white border border-black rounded-md py-2 px-3 text-left"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">{searchQuery ? searchQuery : selectedValue}</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            className="absolute inset-0 w-full py-1 px-3 border-none opacity-0 focus:opacity-100 focus:outline-none"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm"
            tabIndex={-1}
            role="listbox"
          >
            {filteredOptions.map((option) => (
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
