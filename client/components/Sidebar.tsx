/* eslint-disable no-underscore-dangle */
// import React, { useState } from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { axiosMongoApi } from '../utils/axios';

type SidebarProps = {
  sideBarIsOpen: boolean;
  setSideBarIsOpen: (value: boolean) => void;
};

// const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

function Sidebar({ sideBarIsOpen, setSideBarIsOpen }: SidebarProps) {
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  console.log('base');
  const handleCategoryButton = async (category: any) => {
    console.log('Search Input:', category);
    router.push(`/?category=${category}`);
  };

  useEffect(() => {
    console.log('useeffect');
    const getCategories = async () => {
      try {
        const response = await axiosMongoApi.get(
          '/api/v1/products/categories/all',
        );
        console.log('data: ', response.data);
        // const products: Products[] = response.data;
        setCategories(response.data);
      } catch (error) {
        console.log('error', error);
      }
      // let categories = await fetch(`${config.BASE_URL}/categories`).then((r) =>
      //   r.json(),
      // );
      // setCategories(categories);
    };

    getCategories();
  }, []);

  return (
    <div
      className={`top-0 left-0 fixed bg-gray-100 w-72 h-full p-5 z-40 ${
        sideBarIsOpen ? '-translate-x-0' : '-translate-x-full'
      } ease-in-out duration-300`}
    >
      <button
        type="button"
        onClick={() => setSideBarIsOpen(false)}
        className="text-xl fixed top-4 right-4"
      >
        x
      </button>
      <h2 className="text-2xl">Categories</h2>

      <ul className="list-group">
        {categories.map((c: any, index: any) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={`li${index}`}
            className="flex items-center justify-between text-md my-2"
          >
            <button type="button" onClick={() => handleCategoryButton(c._id)}>
              {c._id}
            </button>
            <span className="badge bg-dark-green rounded-pill">{c.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
