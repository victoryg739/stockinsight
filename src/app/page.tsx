"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative z-20 flex items-center overflow-hidden bg-white">
        <div className="container relative flex px-6 py-16 mx-auto">
          <div className="relative z-20 flex flex-col sm:w-2/3 lg:w-2/5">
            <span className="w-20 h-2 mb-12 bg-gray-800"></span>
            <h1 className="flex flex-col text-7xl font-black leading-none text-gray-800 uppercase font-bebas-neue">
              Discover
              <span className="text-4xl mt-2">The True Value</span>
            </h1>
            <p className="mt-8 text-sm text-gray-700 sm:text-base">
              Don&apos;t leave your investments to chance. Our DCF valuation tool gives you the edge in today&apos;s
              market. Start making data-driven decisions now.
            </p>

            <div className="flex mt-8">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
              >
                Register Now
              </button>
            </div>
          </div>
          <div className="relative hidden sm:block sm:w-1/3 lg:w-3/5">
            <Image
              src="/revenue.svg"
              alt="Revenue icon"
              height={600}
              width={600}
              className="object-contain mb-4" // Added margin-bottom for spacing
            />
          </div>
        </div>
      </div>
    </div>
  );
}
