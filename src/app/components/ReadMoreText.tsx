import React, { useState } from "react";

const sliceTextByWords = (text, maxLength) => {
  const words = text.split(" ");
  let result = "";
  let length = 0;

  for (let word of words) {
    if (length + word.length + 1 > maxLength) break;
    result += (length > 0 ? " " : "") + word;
    length += word.length + 1; // Adding 1 for the space
  }

  return result;
};

export default function ReadMoreText({ text, maxLength = 200 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-8">
      <p className="text-base leading-relaxed tracking-wide">
        {isExpanded ? text : `${sliceTextByWords(text, maxLength)}...`}
        <button onClick={toggleReadMore} className="text-blue-600 hover:underline focus:outline-none">
          {isExpanded ? "[Read Less]" : "[Read More]"}
        </button>
      </p>
    </div>
  );
}
