import React from "react";
import Pricing from "./components/Pricing";
import { auth } from "@/auth";

export default async function PricingPage() {
  const session = await auth();
  const userId = session?.user?.id as string;
  if (!userId || userId === undefined) return null;
  return (
    <div>
      <Pricing userId={userId} price="price_1OrhQuSFLWaiVacnZFMnjaIQ" />
    </div>
  );
}
