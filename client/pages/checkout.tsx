/* eslint-disable no-underscore-dangle */
import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import img1 from '../assets/mern-banner.jpg';
import Header from '../components/Header';
import { selectCartItems, selectTotal } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { numberCurrencyFormat } from '../utils/utils';
import { axiosNextApi } from '../utils/axios';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const stripePromise = loadStripe(process.env.stripe_public_key!);

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Create checkout session and get stripe session.id from Next.JS API.
    const checkoutSession = await axiosNextApi.post(
      '/api/create-checkout-session',
      {
        items: cartItems,
        email: session?.user?.email,
      },
    );

    // Redirect customer to Stripe checkout using the session.id
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) console.log('ERRORI:', result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          {/* <Image src={img1} width={1020} height={250} objectFit="contain" /> */}
          <Image src={img1} layout="responsive" objectFit="contain" alt="" />

          <div className="flex mt-5 flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {cartItems.length === 0
                ? 'Your Shopping Cart is Empty'
                : 'Your Shopping Cart'}
            </h1>
            {cartItems.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <CheckoutProduct key={i} product={item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {cartItems.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({cartItems.length} items):{' '}
                <span className="font-bold">{numberCurrencyFormat(total)}</span>
              </h2>

              <button
                type="button"
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
