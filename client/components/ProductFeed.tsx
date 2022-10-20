/* eslint-disable no-underscore-dangle */
import React from 'react';
import Image from 'next/image';
import Product from './Product';
import adImg1 from '../assets/mern-banner.jpg';

type Products = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
};

type PropProducts = {
  products: Products[];
};

const ProductFeed = ({ products }: PropProducts) => (
  <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
    {products.slice(0, 4).map((product) => (
      <Product key={product._id} product={product} />
    ))}
    <div className="grid md:col-span-full">
      <Image
        src={adImg1.src}
        alt=""
        width={1500}
        height={300}
        objectFit="contain"
      />
    </div>

    <div className="md:col-span-2">
      {products.slice(4, 5).map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    {products.slice(5, products.length).map((product) => (
      <Product key={product._id} product={product} />
    ))}
  </div>
);

export default ProductFeed;
