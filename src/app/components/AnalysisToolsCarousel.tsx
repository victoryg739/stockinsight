import React, { useRef, useState, useEffect } from "react";
import { MdInsights, MdCasino, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { SiMarketo } from "react-icons/si";
import { FaDollarSign } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";

interface AnalysisToolsCarouselProps {
  setFundamentalPopup: (value: boolean) => void;
  setMarketPopup: (value: boolean) => void;
  setMonteCarloPopup: (value: boolean) => void;
  setSensitivityPopup: (value: boolean) => void;
  setCurrencyConverterPopup: (value: boolean) => void;
  symbol: string;
  currencyConverted?: boolean;
}

const AnalysisToolsCarousel: React.FC<AnalysisToolsCarouselProps> = ({
  setFundamentalPopup,
  setMarketPopup,
  setMonteCarloPopup,
  setSensitivityPopup,
  setCurrencyConverterPopup,
  symbol,
  currencyConverted,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeButton, setActiveButton] = useState(-1);
  const [allButtonsVisible, setAllButtonsVisible] = useState(true); // Start with center alignment

  // Define your tools
  const tools = [
    {
      name: "Fundamental Data",
      icon: <BsClipboard2Data className="mr-2" />,
      onClick: () => setFundamentalPopup(true),
    },
    {
      name: "Market Insight",
      icon: <MdInsights className="mr-2" />,
      onClick: () => setMarketPopup(true),
    },
    {
      name: "Monte Carlo Simulation",
      icon: <MdCasino className="mr-2" />,
      onClick: () => setMonteCarloPopup(true),
    },
    {
      name: "Sensitivity Analysis",
      icon: <SiMarketo className="mr-2" />,
      onClick: () => setSensitivityPopup(true),
    },
    {
      name: currencyConverted ? "Currency Converted" : "Currency Converter", // Change name when converted
      icon: <FaDollarSign className="mr-2" />,
      onClick: () => setCurrencyConverterPopup(true),
      disabled: currencyConverted, // Still disable the button
      disabledMessage: "Currency conversion already applied",
    },
  ];

  // Calculate the total width needed for all buttons
  const calculateTotalButtonsWidth = () => {
    if (!buttonsContainerRef.current) return 0;

    // Get all buttons
    const buttons = Array.from(buttonsContainerRef.current.children);

    // Calculate total width including gap
    let totalWidth = 0;
    buttons.forEach((button, index) => {
      const buttonEl = button as HTMLElement;
      totalWidth += buttonEl.offsetWidth;

      // Add gap width for all but the last button
      if (index < buttons.length - 1) {
        const gapSize = getComputedGap();
        totalWidth += gapSize;
      }
    });

    return totalWidth;
  };

  // Get the gap size from CSS
  const getComputedGap = () => {
    if (!buttonsContainerRef.current) return 16; // Default 16px (4 in Tailwind)

    const style = window.getComputedStyle(buttonsContainerRef.current);
    const gap = style.gap || style.columnGap;

    return gap ? parseInt(gap, 10) : 16;
  };

  // Calculate visible buttons and update arrow visibility
  const updateArrowVisibility = () => {
    if (!carouselRef.current || !buttonsContainerRef.current) return;

    const containerWidth = carouselRef.current.clientWidth;
    const totalButtonsWidth = calculateTotalButtonsWidth();

    // Check if all buttons fit without scrolling
    const allFit = totalButtonsWidth <= containerWidth;

    // Set the appropriate flags
    setAllButtonsVisible(allFit);

    if (allFit) {
      // If all buttons fit, hide both arrows
      setShowLeftArrow(false);
      setShowRightArrow(false);
    } else {
      // Otherwise show arrows based on scroll position
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 5);

      // Modified: Use a smaller threshold (1px instead of 5px) to ensure we can scroll to the very end
      // This ensures the right arrow remains visible until we've scrolled to see the entire content
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Initialize on mount and update on resize
  useEffect(() => {
    // Run immediately, then with a small delay as fallback
    updateArrowVisibility();

    const timer = setTimeout(() => {
      updateArrowVisibility();
    }, 10); // Reduced delay

    const handleResize = () => {
      updateArrowVisibility();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for scroll events to update arrow visibility
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateArrowVisibility);
      return () => scrollContainer.removeEventListener("scroll", updateArrowVisibility);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get visible width of buttons container
  const getVisibleWidth = () => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.clientWidth;
  };

  // Get button width without the gap
  const getButtonWidth = () => {
    if (!buttonsContainerRef.current || !buttonsContainerRef.current.firstElementChild) return 240;

    const firstButton = buttonsContainerRef.current.firstElementChild as HTMLElement;
    return firstButton.offsetWidth;
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const visibleWidth = getVisibleWidth();

    // Modified: Calculate scroll amount as 80% of visible width to ensure overlap and prevent cut-off
    const scrollAmount = Math.floor(visibleWidth * 0.8);

    const currentScroll = carouselRef.current.scrollLeft;
    let newScrollLeft = direction === "left" ? Math.max(0, currentScroll - scrollAmount) : currentScroll + scrollAmount;

    // Special handling for right scrolls to ensure we can see the last button fully
    if (direction === "right" && carouselRef.current) {
      const { scrollWidth, clientWidth } = carouselRef.current;
      // If this scroll would get us near the end, scroll to the very end
      if (newScrollLeft + clientWidth > scrollWidth - 80) {
        newScrollLeft = scrollWidth - clientWidth;
      }
    }

    // Animate the scroll
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // Handle tool click with animation
  const handleToolClick = (index: number, callback: () => void) => {
    setActiveButton(index);
    setTimeout(() => {
      setActiveButton(-1);
      callback();
    }, 200);
  };

  return (
    <div className="relative w-full mt-10 mx-auto px-5 py-5 bg-white rounded-2xl drop-shadow-md border">
      <div className="flex items-center">
        {/* Left Arrow */}
        <button
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center mr-2 transition-opacity duration-300 hover:bg-gray-700 ${
            showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scrollCarousel("left")}
          aria-label="Scroll left"
        >
          <MdChevronLeft size={20} />
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex-1 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Inner container for buttons */}
          <div
            ref={buttonsContainerRef}
            className={`flex gap-4 py-2 ${allButtonsVisible ? "justify-center mx-auto" : "w-max"}`}
          >
            {tools.map((tool, index) => (
              <button
                key={index}
                className={`text-white ${
                  activeButton === index ? "bg-gray-700 scale-95" : "bg-gray-800 hover:bg-gray-700"
                } 
                  flex items-center justify-center rounded-lg px-4 py-2 w-56 flex-shrink-0
                  transition-all duration-200 transform hover:scale-[1.02]
                  ${tool.disabled ? "opacity-50 cursor-not-allowed hover:bg-gray-800 hover:scale-100" : ""}`}
                onClick={() => !tool.disabled && handleToolClick(index, tool.onClick)}
                title={tool.disabled ? tool.disabledMessage : ""}
                disabled={tool.disabled}
              >
                {tool.icon}
                {tool.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center ml-2 transition-opacity duration-300 hover:bg-gray-700 ${
            showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scrollCarousel("right")}
          aria-label="Scroll right"
        >
          <MdChevronRight size={20} />
        </button>
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AnalysisToolsCarousel;
