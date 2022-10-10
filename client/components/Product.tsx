import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { numberCurrencyFormat, randomStarRating } from '../utils/utils';
import { addToCart } from '../slices/cartSlice';

type ProductProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image_url: string;
  };
};

function Product({ product }: ProductProps) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState<number>();
  const [hasFreeDelivery, setHasFreeDelivery] = useState<boolean>();

  useEffect(() => {
    setRating(randomStarRating(1, 5));
    setHasFreeDelivery(Math.random() < 0.5);
  }, []);

  const addItemToCart = () => {
    const cartProduct = {
      ...product,
      rating,
      hasFreeDelivery,
    };
    dispatch(addToCart(cartProduct));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>

      <Image
        alt=""
        src={
          // Quick fix ternary to fix missing png suffix. Next.js Image component gives CORS errros if suffix missing.
          product.image_url === 'https://via.placeholder.com/250x250'
            ? 'https://via.placeholder.com/250x250.png'
            : product.image_url
        }
        height={200}
        width={200}
        objectFit="contain"
      />

      <h4 className="my-3">{product.name}</h4>

      <div className="flex">
        {Array(rating)
          .fill('')
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{product.description}</p>

      <div className="mb-5">{numberCurrencyFormat(product.price)}</div>

      {hasFreeDelivery && (
        <div className="flex items-center space-x-2 -mt-5">
          <p className="text-xs mb-5 text-gray-500">
            &#x2728; FREE Next-day Delivery
          </p>
        </div>
      )}

      <button onClick={addItemToCart} type="button" className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
