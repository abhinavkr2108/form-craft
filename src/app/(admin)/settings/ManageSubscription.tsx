"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function ManageSubscription() {
  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    try {
      const response = await axios.post("/api/stripe/create-portal");
      const { url } = response.data;
      console.log("CUSTOMER PORTAL URL", url);
      router.push(url.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={redirectToCustomerPortal}>Manage Subscription</Button>
    </div>
  );
}
