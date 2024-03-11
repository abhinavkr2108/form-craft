import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  createSubscription,
  deleteSubscription,
} from "@/app/actions/userSubscriptions";

export async function POST(req: Request) {
  const sig = req.headers.get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    return new Response("No signature", { status: 500 });
  }

  if (!webhookSecret) {
    return new Response("No webhook secret", { status: 500 });
  }

  const relevantEvents = new Set([
    "checkout.session.completed",
    "invoice.payment_succeeded",
    "invoice.payment_failed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ]);
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    sig,
    webhookSecret
  );

  if (relevantEvents.has(event.type)) {
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated"
    ) {
      await createSubscription({
        userId: event.data.object.customer as string,
      });
    } else if (event.type === "customer.subscription.deleted") {
      await deleteSubscription({
        userId: event.data.object.customer as string,
      });
    }
  }
}
