/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
// import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import { GoogleLogin } from '@react-oauth/google'; FOR GOOGLE ID_TOKEN STRATEGY
import { selectCartItems } from '../slices/cartSlice';
import Sidebar from './Sidebar';
import { axiosMongoApi } from '../utils/axios';

function Header() {
  const { data: session } = useSession();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  console.log('*SESSION*', session);
  // console.log('*DATA*', data);

  const handleSearchButton = async () => {
    console.log('Search Input:', searchInput);
    router.push(`/?search=${searchInput}`);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearchButton();
    }
  };

  const handleSearchTermChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleKeyUp = async () => {
    try {
      const response = await axiosMongoApi.get(
        `/api/v1/products/autocomplete/${searchInput}`,
      );
      const products: any = response.data;
      setSearchSuggestions(products);
    } catch (error: any) {
      console.log(error.message);
      setSearchSuggestions([]);
    }
  };

  /** FOR GOOGLE ID_TOKEN STRATEGY */
  // const [token, setToken] = useState('');

  // const handleGoogleOnSuccess = async (credentialResponse: any) => {
  //   console.log(credentialResponse);
  //   if (credentialResponse.credential) {
  //     const res = await axios.post(
  //       'http://localhost:4000/api/v1/login',
  //       {},
  //       {
  //         headers: {
  //           id_token: credentialResponse.credential,
  //         },
  //       },
  //     );
  //     setToken(res.data.token);
  //   }
  // };
  /** FOR GOOGLE ID_TOKEN STRATEGY */

  return (
    <header className="sticky top-0 z-40">
      <Sidebar
        sideBarIsOpen={sideBarIsOpen}
        setSideBarIsOpen={setSideBarIsOpen}
      />
      {/* Header */}
      <div className="flex items-center bg-ecom_blue p-1 flex-grow py-2 h-20">
        {/* Left Side Menu and Logo */}
        <div className="flex items-center flex-grow-0 sm:flex-grow-0 text-white">
          <Bars3Icon
            onClick={() => setSideBarIsOpen(true)}
            className="h-8 cursor-pointer"
          />

          <span
            onClick={() => router.push('/')}
            className="text:xs sm:text-xl sm:flex cursor-pointer -mt-1 md:ml-4 md:mr-6 ml-1 mr-1 font-extrabold whitespace-nowrap"
          >
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
            type="search"
            list="datalistOptions"
            onKeyPress={handleKeyPress}
            onKeyUp={handleKeyUp}
            onChange={handleSearchTermChange}
            onSubmit={handleSearchButton}
            placeholder="Search..."
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <datalist id="datalistOptions">
            {searchSuggestions.map((s: any, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={index} value={s.name} aria-label={s.name} />
            ))}
          </datalist>
          <MagnifyingGlassIcon
            type="button"
            onClick={handleSearchButton}
            className="sm:h-12 sm:p-4 h-8 p-2"
          />
        </div>

        {/* Right Side */}
        <div className="flex text-white items-center text-xs md:space-x-6 md:mx-6 whitespace-nowrap">
          <div
            onClick={!session ? () => signIn() : () => signOut()}
            className="link hidden md:inline"
          >
            <p>{session ? `Hello, ${session.user?.name}` : 'Sign In'}</p>
            <p className="font-extrabold md:text-sm">Account</p>
          </div>

          <div
            onClick={() => session && router.push('/orders')}
            className="link hidden md:inline"
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push('/checkout')}
            className="relative link flex items-center"
          >
            <span className="absolute leading-2.5 py-0.5 top-0 md:right-6 right-0.5 h-5 w-5 bg-sky-400 text-center rounded-full text-white font-bold">
              {cartItems.length}
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
