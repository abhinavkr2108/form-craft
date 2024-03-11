import { auth } from "@/auth";
import { db } from "@/database";
import { users } from "@/database/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const userSession = await auth();
    const userId = userSession?.user?.id;

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
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
    }

    const url = await stripe.billingPortal.sessions.create({
      customer,
      return_url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/account` ||
        "http://localhost:3000/account",
    });

    console.log("CUSTOMER PORTAL URL FROM SERVER", url);
    return new Response(JSON.stringify({ url }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
