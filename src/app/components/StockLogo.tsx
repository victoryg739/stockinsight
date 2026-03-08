"use client";

import React, { useState } from "react";
import Image from "next/image";

interface StockLogoProps {
  symbol: string;
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

const StockLogo: React.FC<StockLogoProps> = ({
  symbol,
  alt,
  height = 64,
  width = 64,
  className = "",
  priority = false,
  fallbackSrc = "/placeholder-logo.svg", // Make sure to add this fallback image to your public folder
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use the API route we created
  const logoSrc = symbol && !imageError ? `/api/logo/${symbol}` : fallbackSrc;

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!symbol) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg ${className}`} style={{ width, height }}>
        <span className="text-gray-400 dark:text-gray-500 text-xs">No logo</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
          <div className="w-3/4 h-3/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      )}
      <Image
        src={logoSrc}
        alt={alt || `${symbol} logo`}
        width={width}
        height={height}
        className={`rounded-lg object-contain ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
      />
    </div>
  );
};

export default StockLogo;
