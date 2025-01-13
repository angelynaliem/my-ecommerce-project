import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLISH_STRIPE_PUBLISHABLE!);
  }
  return stripePromise;
};

export default getStripe;
