import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function PaymentSuccessPage() {
  return (
    <section className="py-28 relative bg-green-600">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
        <div className="max-w-xl md:mx-auto">
          <p className="text-white text-3xl font-semibold sm:text-4xl">
            Payment Successful
          </p>
          <p className="text-green-100 mt-3">
            You are now subscriped to our pro plan. You can now create unlimited
            forms.
          </p>
        </div>
        <div className="mt-4">
          <Link href="/">
            <Button>Get Started </Button>
          </Link>
        </div>
      </div>
      <div
        className="absolute top-0 w-full h-full"
        style={{
          background:
            "linear-gradient(268.24deg, rgba(87, 243, 87, 0.76) 50%, rgba(87, 243, 87, 0.545528) 80.61%, rgba(55, 48, 163, 0) 117.35%)",
        }}
      ></div>
    </section>
  );
}
