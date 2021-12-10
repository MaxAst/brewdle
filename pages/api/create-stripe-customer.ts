// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import StripeClient from "stripe";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const stripe = new StripeClient(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });
  const customer = await stripe.customers.create({ email: req.body.email });

  res
    .status(200)
    .json({ message: `Stripe customer created with id ${customer.id}` });
}
