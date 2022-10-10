/* eslint-disable no-underscore-dangle */
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { numberCurrencyFormat } from '../utils/utils';

type ProductProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image_url: string;
    rating: number;
    hasFreeDelivery: boolean;
  };
};

function CheckoutProduct({ product }: ProductProps) {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const cartProduct = {
      ...product,
      rating: product.rating,
      hasFreeDelivery: product.hasFreeDelivery,
    };
    dispatch(addToCart(cartProduct));
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ _id: product._id }));
  };
  return (
    <div className="grid grid-cols-5 shadow-md">
      <Image
        alt=""
        src={product.image_url}
        height={200}
        width={200}
        objectFit="contain"
      />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{product.name}</p>
        <div className="flex">
          {Array(product.rating)
            .fill('')
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <p>{numberCurrencyFormat(product.price)}</p>

        {product.hasFreeDelivery && (
          <div className="flex items-center space-x-2">
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button type="button" onClick={addItemToCart} className="button">
          Add to Cart
        </button>
        <button type="button" onClick={removeItemFromCart} className="button">
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
