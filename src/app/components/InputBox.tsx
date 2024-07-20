import React, { useState, useRef, useEffect } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const InputBox = ({ id, label, value, question, onChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: true, top: true });
  const [shouldWrap, setShouldWrap] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const shouldMoveLeft = rect.right > window.innerWidth;
      const shouldMoveUp = rect.bottom > window.innerHeight;
      setTooltipPosition({ left: !shouldMoveLeft, top: !shouldMoveUp });

      // Check if text needs to wrap
      setShouldWrap(rect.width > window.innerWidth / 2);
    }
  }, [showTooltip]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div
          className="relative ml-2"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FaRegQuestionCircle className="text-gray-500" />
          {showTooltip && (
            <div
              ref={tooltipRef}
              className={`absolute z-10 bg-gray-800 text-white p-2 rounded text-sm
                ${shouldWrap ? "whitespace-normal max-w-xs" : "whitespace-nowrap"}
                ${tooltipPosition.left ? "left-full" : "right-full"} 
                ${tooltipPosition.top ? "top-0" : "bottom-0"} 
                ml-2`}
            >
              {question}
            </div>
          )}
        </div>
      </div>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-7/8 rounded-md border-black border py-1 px-3"
      />
    </div>
  );
};

export default InputBox;
