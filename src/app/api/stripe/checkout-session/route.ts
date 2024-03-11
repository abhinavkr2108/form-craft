import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();
  const userSession = await auth();
  const userId = userSession?.user?.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  let customer;
  if (user?.stripeCustomerId) {
    customer = user.stripeCustomerId;
  } else {
    const customerData = {
      metadata: {
        dbId: userId,
      },
      email: user.email,
    };

    const response = await stripe.customers.create(customerData);
    customer = response.id;

    await db
      .update(users)
      .set({ stripeCustomerId: customer })
      .where(eq(users.id, userId));
  }

  const baseurl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    success_url: `${baseurl}/payment/success`,
    cancel_url: `${baseurl}/payment/cancel`,
    customer: customer,
    payment_method_types: ["card"],
    line_items: [
      {
        price: price,
        quantity: quantity,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "IN", "ID"],
    },
    mode: "subscription",
  });

  if (session) {
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      { status: 400 }
    );
  }
}
