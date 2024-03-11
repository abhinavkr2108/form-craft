import { loadStripe, Stripe } from "@stripe/stripe-js";
let stripePromise: Promise<Stripe | null>;
import * as dotenv from "dotenv";

dotenv.config();
export function getStripe() {
  if (!process.env.NEXT_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLISHABLE_KEY is not defined");
  }

  console.log("NEXT KEY", process.env.NEXT_PUBLISHABLE_KEY);
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLISHABLE_KEY);
  }
  return stripePromise;
}
