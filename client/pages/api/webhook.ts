/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-anonymous-default-export */
import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { axiosMongoApi } from '../../utils/axios';

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session: any) => {
  console.log('Fulfilling order WEBHOOK SESSION :)', session);

  const images = JSON.parse(session.metadata.images).map((image: any) =>
    JSON.stringify(image),
  );
  return axiosMongoApi
    .post('/api/v1/orders/', {
      userEmail: session.metadata.email ? session.metadata.email : 'na@na.com',
      stripeId: session.id,
      amount: session.amount_total / 100,
      amountShipping: session.total_details.amount_shipping / 100,
      images: images,
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    })
    .catch((err) => console.log('Webhook Post MongoApi ERROR:', err.message));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('WEBHOOK ENDPOINT POST');
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    // Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err: any) {
      console.log('WEBHOOK CONSOLE ERROR:', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    console.log('Stripe Webhook event##:', event);
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Fulfill the order...
      return fulfillOrder(session)
        .then(() => res.status(200).json({ received: true }))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
  return undefined;
};

// Next.js has config file for each endpoint. You can change it like below.
// Disable bodyParser - When handling webhook you don't want bodyparser
// External resolver true - this been resolved by stripe externally
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
