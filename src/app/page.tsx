import FormGenerator from "@/components/shared/FormGenerator";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import { db } from "@/database";
import FormsList from "@/components/shared/FormsList";
import Link from "next/link";
import LandingPage from "@/components/shared/LandingPage";
import Navbar from "@/components/shared/Navbar";
import { auth } from "@/auth";

export default async function Home() {
  const forms = await db.query.forms.findMany();
  const session = await auth();
  return (
    <SessionProvider>
      <Navbar session={session} />
      <LandingPage />
    </SessionProvider>
  );
}
