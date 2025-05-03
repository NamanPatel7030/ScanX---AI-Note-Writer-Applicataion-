"use client";

import { Button } from "../components/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  useEffect(() => {
    // If user is already signed in, redirect to dashboard
    if (isSignedIn) {
      checkUser();
      router.push("/dashboard");
    }
  }, [isSignedIn]);

  const checkUser = async () => {
    try {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress || "",
        imageUrl: user?.imageUrl || "",
        userName: user?.fullName || "Anonymous",
      });
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
        <div className="bg-black bg-opacity-75 rounded-3xl px-8 py-3 shadow-2xl">
          <div className="flex items-center space-x-20">
            <Link href="/features" className="text-white hover:text-gray-300">
              Features
            </Link>
            <Link href="/solution" className="text-white hover:text-gray-300">
              Solution
            </Link>
            <Link href="/">
              <Image
                src={"/scanx-logo.png"}
                alt="ScanX Logo"
                width={60}
                height={60}
              />
            </Link>
            <Link href="/pricing" className="text-white hover:text-gray-300">
              Pricing
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Large Logo Above Hero Section */}
      <div className="flex justify-center pt-10 mb-2">
        <Image
          src="/ScanX_Logo.png"
          alt="ScanX Logo"
          width={400}
          height={400}
          className="animate-pulse"
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="text-gray-900">Simplify </span>
          <span className="text-red-500">PDF </span>
          <span className="text-blue-500">Note</span>
          <span className="text-gray-900">-Taking</span>
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          with AI-Powered
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Elevate your note-taking experience with our AI-powered PDF app.
          Seamlessly extract key insights, summaries, and annotations from any
          PDF with just a few clicks
        </p>

        <div className="flex justify-center gap-4 mb-20">
          <Button
            className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6"
            onClick={handleGetStarted}
          >
            Get started
          </Button>
          <Link href="#features">
            <Button
              variant="outline"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full px-8 py-6"
            >
              Learn more
            </Button>
          </Link>
        </div>
      </section>

      {/* User authentication button */}
      {user && (
        <div className="fixed top-4 right-4">
          <UserButton />
        </div>
      )}
    </div>
  );
}
