/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

function Header() {
  return (
    <header>
      {/* Header */}
      <div className="flex items-center bg-ecom_blue p-1 flex-grow py-2 h-20">
        {/* Left Side Menu and Logo */}
        <div className="flex items-center flex-grow-0 sm:flex-grow-0 text-white">
          <Bars3Icon className="h-8 cursor-pointer" />

          <span className="text:xs sm:text-xl sm:flex cursor-pointer -mt-1 md:ml-4 md:mr-6 ml-1 mr-1 font-extrabold whitespace-nowrap">
            eCom MERN Stack
          </span>

          {/* <Image
            src="/ecom.png"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
            alt=""
          /> */}
        </div>

        {/* Middle Search */}
        <div className="flex mx-2 md:mx-0 items-center h-10 rounded-md flex-grow cursor-pointer bg-sky-400 hover:bg-sky-500">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <MagnifyingGlassIcon className="sm:h-12 sm:p-4 h-8 p-2" />
        </div>

        {/* Right Side */}
        <div className="flex text-white items-center text-xs md:space-x-6 md:mx-6 whitespace-nowrap">
          <div className="link hidden md:inline">
            <p>Hello, Sign In</p>
            <p className="font-extrabold md:text-sm">Account</p>
          </div>

          <div className="link hidden md:inline">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="relative link flex items-center">
            <span className="absolute top-0 md:right-6 right-0.5 h-4 bg-sky-400 text-center rounded-full text-black font-bold">
              12
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Cart
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
