/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import moment from 'moment/moment';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import Header from '../components/Header';
import Order from '../components/Order';
import { axiosMongoApi } from '../utils/axios';

function Orders({ orders }: any) {
  const { data: session } = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-sky-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>Plese sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }: any) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            ),
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

/**
 * Next.js Server side rendering is done below
 */
export async function getServerSideProps(context: any) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials use NextAuth getSession server-side and useSession client-side
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  // Get orders from MongoDB
  console.log('email', session?.user?.email);
  let stripeOrders: any;
  try {
    const response = await axiosMongoApi.get(
      `/api/v1/orders/email/${session?.user?.email}`,
    );
    stripeOrders = response.data;
    console.log(
      `SUCCESS: Order found for ${
        session?.user?.email
      }, resposne${JSON.stringify(response.data)}`,
    );
  } catch (err: any) {
    console.log('Get orders orders.tsx ERROR:', err.message);
  }

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.map(async (order: any) => ({
      id: order.stripeId,
      amount: order.amount,
      amountShipping: order.amountShipping,
      images: order.images,
      timestamp: moment(order.createdAt).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.stripeId, {
          limit: 100,
        })
      ).data,
    })),
  );
  return {
    props: {
      orders,
    },
  };
}
