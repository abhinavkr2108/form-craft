import FormGenerator from "@/components/shared/FormGenerator";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <FormGenerator />
    </SessionProvider>
  );
}
