/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// This is Next.JS API endpoint controller/handler - localhost:3000/create-checkout-session
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { items, email } = req.body;
  console.log('Create-checkout-session cart items', items);

  // Transform product data to correct format for Stripe API
  const transformedItems = items.map((item: any) => ({
    // description: item.description,
    quantity: 1,
    price_data: {
      currency: 'eur',
      unit_amount: Math.round(item.price * 100),
      product_data: {
        name: item.name,
        images: [item.image_url],
        description: item.category ? item.category : '-',
      },
    },
  }));

  console.log('Create-checkout-session TRANSFORMED', transformedItems);

  // Create stripe session.
  // Send the session.id response back that you can use in font-end to generate stripe checkout page.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [
      { shipping_rate: 'shr_1LuTFzFktKpPsI4rokYL71l6' },
      { shipping_rate: 'shr_1LuTHYFktKpPsI4r1jaAJmkR' },
    ],
    shipping_address_collection: {
      allowed_countries: ['FI', 'US'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image_url)),
    },
  });

  res.status(200).json({ id: session.id });
};
