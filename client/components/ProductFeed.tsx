import React from 'react';
import Image from 'next/image';
import Product from './Product';
import adImg1 from '../assets/mern-banner.jpg';
import type { ProductProps } from '../pages';

const ProductFeed = ({ products }: ProductProps) => (
  <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40">
    {products
      .slice(0, 4)
      .map(({ _id, name, price, description, category, image_url }) => (
        <Product
          key={_id}
          _id={_id}
          name={name}
          price={price}
          description={description}
          category={category}
          image_url={image_url}
        />
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
      {products
        .slice(4, 5)
        .map(({ _id, name, price, description, category, image_url }) => (
          <Product
            key={_id}
            _id={_id}
            name={name}
            price={price}
            description={description}
            category={category}
            image_url={image_url}
          />
        ))}
    </div>

    {products
      .slice(5, products.length)
      .map(({ _id, name, price, description, category, image_url }) => (
        <Product
          key={_id}
          _id={_id}
          name={name}
          price={price}
          description={description}
          category={category}
          image_url={image_url}
        />
      ))}
  </div>
);

export default ProductFeed;
