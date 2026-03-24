"use client";

import { Button } from "../components/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return [count, ref];
}

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  const [usersCount, usersRef] = useCountUp(1200, 2000);
  const [docsCount, docsRef] = useCountUp(50000, 2500);
  const [hoursCount, hoursRef] = useCountUp(10000, 2200);

  useEffect(() => {
    if (isSignedIn) {
      checkUser();
      router.push("/dashboard");
    }
  }, [isSignedIn]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkUser = async () => {
    try {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress || "",
        imageUrl: user?.imageUrl || "",
        userName: user?.fullName || "Anonymous",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Mobile Incompatibility Overlay */}
      <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <p className="text-white text-center text-xl px-6">
          ScanX is not compatible with mobile screens. Please open on a PC or
          Laptop.
        </p>
      </div>

      {/* Main Content */}
      <div className="hidden md:block">
        {/* Floating Nav */}
        <nav className="fixed bottom-6 left-0 right-0 flex justify-center z-40">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-10 py-3 shadow-2xl shadow-purple-500/10">
            <div className="flex items-center space-x-16">
              <Link
                href="/features"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="/solution"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Solution
              </Link>
              <Link href="/">
                <Image
                  src="/scanx-logo.png"
                  alt="ScanX Logo"
                  width={48}
                  height={48}
                  className="hover:scale-110 transition-transform brightness-0 invert"
                />
              </Link>
              <Link
                href="/pricing"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px]"
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          />
        </div>

        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          {/* Pill Badge */}
          <div className="mb-8 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI-Powered Note Taking — Now with Gemini 2.5
          </div>

          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/ScanX_Logo.png"
              alt="ScanX Logo"
              width={180}
              height={180}
              className="drop-shadow-[0_0_60px_rgba(147,51,234,0.3)] brightness-0 invert"
            />
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight max-w-5xl">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Simplify{" "}
            </span>
            <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              PDF{" "}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Note
            </span>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              -Taking
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl text-center leading-relaxed">
            Extract key insights, summaries, and annotations from any PDF with
            AI. Just upload, select text, and let intelligence do the rest.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4">
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105"
            >
              Get Started Free
            </Button>
            <Link href="/features">
              <Button
                variant="outline"
                className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white rounded-full px-10 py-6 text-lg font-semibold transition-all"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-24 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* ===== PREVIEW SECTION ===== */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-2 shadow-2xl shadow-purple-500/10">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-gray-500">
                  scanx — workspace
                </span>
              </div>
              <Image
                src="/DashBoard.png"
                alt="ScanX Dashboard"
                width={1200}
                height={700}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* ===== STATS SECTION ===== */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            <div
              ref={usersRef}
              className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {usersCount.toLocaleString()}+
              </div>
              <div className="mt-2 text-gray-400">Active Users</div>
            </div>
            <div
              ref={docsRef}
              className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {docsCount.toLocaleString()}+
              </div>
              <div className="mt-2 text-gray-400">PDFs Processed</div>
            </div>
            <div
              ref={hoursRef}
              className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {hoursCount.toLocaleString()}+
              </div>
              <div className="mt-2 text-gray-400">Hours Saved</div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-24 px-6" id="features">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Features
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Everything You Need
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                From uploading PDFs to getting AI-generated insights — ScanX
                handles it all.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📄",
                  title: "Upload & Organize",
                  desc: "Drag & drop PDFs and have them instantly indexed and searchable.",
                  gradient: "from-purple-500/20 to-transparent",
                },
                {
                  icon: "🤖",
                  title: "AI Summaries",
                  desc: "Select any text and get an intelligent, contextual answer powered by Gemini AI.",
                  gradient: "from-blue-500/20 to-transparent",
                },
                {
                  icon: "✏️",
                  title: "Rich Note Editor",
                  desc: "Bold, italic, headings, highlights — a full editor right beside your PDF.",
                  gradient: "from-pink-500/20 to-transparent",
                },
                {
                  icon: "🔍",
                  title: "Vector Search",
                  desc: "Your PDFs are embedded and semantically searchable for precise answers.",
                  gradient: "from-cyan-500/20 to-transparent",
                },
                {
                  icon: "☁️",
                  title: "Cloud Sync",
                  desc: "Notes and documents are saved securely via Convex — always in sync.",
                  gradient: "from-green-500/20 to-transparent",
                },
                {
                  icon: "⚡",
                  title: "Blazing Fast",
                  desc: "Built on Next.js with edge-ready architecture for instant load times.",
                  gradient: "from-yellow-500/20 to-transparent",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`group p-6 rounded-2xl border border-white/10 bg-gradient-to-b ${f.gradient} hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5`}
                >
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
                How It Works
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Three Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-10">
              {[
                {
                  step: "01",
                  title: "Upload PDF",
                  desc: "Drop your PDF into ScanX. It gets processed and embedded for AI search.",
                  color: "text-purple-400",
                },
                {
                  step: "02",
                  title: "Select & Ask",
                  desc: "Highlight any text in the editor, then click the AI sparkle button.",
                  color: "text-blue-400",
                },
                {
                  step: "03",
                  title: "Get Answers",
                  desc: "Watch as AI types out a detailed, contextual answer with a sleek animation.",
                  color: "text-pink-400",
                },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`text-7xl font-black ${s.color} opacity-30 mb-4`}
                  >
                    {s.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PDF PREVIEW SECTION ===== */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="text-pink-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Workspace
              </p>
              <h2 className="text-4xl font-bold mb-4">
                PDF & Notes, Side by Side
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                View your PDF on one panel and take AI-enhanced notes on the
                other. Resize panels to your liking with our draggable split
                view.
              </p>
              <Button
                onClick={handleGetStarted}
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-5 font-semibold transition-all hover:scale-105"
              >
                Try It Now
              </Button>
            </div>
            <div className="flex-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-xl">
                <Image
                  src="/PDF-Page.png"
                  alt="PDF Workspace"
                  width={600}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Workflow?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of students and professionals who use ScanX to
              study smarter, not harder.
            </p>
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full px-12 py-7 text-xl font-semibold shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105"
            >
              Get Started — It&apos;s Free
            </Button>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-white/10 py-12 px-6 mb-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/scanx-logo.png"
                alt="ScanX"
                width={32}
                height={32}
                className="brightness-0 invert"
              />
              <span className="font-semibold text-gray-300">ScanX</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <Link
                href="/features"
                className="hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/solution"
                className="hover:text-white transition-colors"
              >
                Solution
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </div>
            <p className="text-gray-600 text-sm">
              &copy; 2026 ScanX. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {user && (
        <div className="fixed top-4 right-4 z-50">
          <UserButton />
        </div>
      )}
    </div>
  );
}
