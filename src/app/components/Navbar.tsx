import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { BiSolidBinoculars } from "react-icons/bi";
import { IoIosHome, IoIosCalculator, IoMdHelp } from "react-icons/io";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const toggleNav = () => setNavOpen(!isNavOpen);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-800 border-b-2 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-white">
            StockInsight
          </span>
        </a>

        {/* Login/Logout Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4 md:order-2">
          {session ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 text-center transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn("google")}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 text-center transition-colors"
            >
              Login
            </button>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isNavOpen}
            onClick={toggleNav}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col w-full py-2 mt-3 md:mt-0 md:flex-row md:items-center md:space-x-1 lg:space-x-4 bg-gray-800 md:bg-transparent rounded-lg">
            <li className="w-full">
              <a
                href="/"
                className={`flex items-center gap-1 py-2 px-2 md:px-3 rounded-lg ${
                  isActive("/")
                    ? "text-white bg-blue-600 md:bg-blue-600"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } transition-colors w-full md:w-auto text-sm md:text-sm`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                <IoIosHome className="flex-shrink-0" />
                <span>Home</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="/fcff"
                className={`flex items-center gap-1 py-2 px-2 md:px-3 rounded-lg ${
                  isActive("/fcff")
                    ? "text-white bg-blue-600 md:bg-blue-600"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } transition-colors w-full md:w-auto text-sm md:text-sm`}
                aria-current={isActive("/fcff") ? "page" : undefined}
              >
                <IoIosCalculator className="flex-shrink-0" />
                <span>Valuation</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="/myValuations"
                className={`flex items-center gap-1 py-2 px-2 md:px-3 rounded-lg ${
                  isActive("/myValuations")
                    ? "text-white bg-blue-600 md:bg-blue-600"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } transition-colors w-full md:w-auto text-sm md:text-sm`}
                aria-current={isActive("/myValuations") ? "page" : undefined}
              >
                <BiSolidBinoculars className="flex-shrink-0" />
                <span className="whitespace-nowrap">My Valuations</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="/help"
                className={`flex items-center gap-1 py-2 px-2 md:px-3 rounded-lg ${
                  isActive("/help")
                    ? "text-white bg-blue-600 md:bg-blue-600"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } transition-colors w-full md:w-auto text-sm md:text-sm`}
                aria-current={isActive("/help") ? "page" : undefined}
              >
                <IoMdHelp className="flex-shrink-0" />
                <span>Help</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
