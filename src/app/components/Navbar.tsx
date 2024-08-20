import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { BiSolidBinoculars } from "react-icons/bi";
import { IoIosHome, IoIosCalculator } from "react-icons/io";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current pathname

  const toggleNav = () => setNavOpen(!isNavOpen);

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-gray-800 border-b-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">StockInsight</span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {session ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn("google")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center"
            >
              Login
            </button>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isNavOpen}
            onClick={toggleNav}
          >
            <span className="sr-only">Open main menu</span>
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

        <div
          className={`items-center justify-between ${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex text-sm flex-col gap-x-10 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800">
            <li>
              <a
                href="/"
                className={`flex items-center space-x-2 py-2 px-3 rounded md:p-0 ${
                  isActive("/")
                    ? "text-blue-700 md:dark:text-blue-500"
                    : "text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                <IoIosHome />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="/fcff"
                className={`flex items-center space-x-2 py-2 px-3 rounded md:p-0 ${
                  isActive("/fcff")
                    ? "text-blue-700 md:dark:text-blue-500"
                    : "text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                <IoIosCalculator />
                <span>Valuation</span>
              </a>
            </li>
            <li>
              <a
                href="/watchlist"
                className={`flex items-center space-x-2 py-2 px-3 rounded md:p-0 ${
                  isActive("/watchlist")
                    ? "text-blue-700 md:dark:text-blue-500"
                    : "text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                <BiSolidBinoculars />
                <span>Watchlist</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
