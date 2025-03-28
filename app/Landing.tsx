"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { StickyScrollRevealDemo } from "@/components/features";
import { BoxRevealDemo } from "@/components/secondModule";
import { TypingAnimation } from "@/components/magicui/typing-animation";
const features = [
  "Intuitive Kanban boards",
  "Real-time collaboration",
  "Custom workflows",
  "Advanced task tracking",
];

const LandingPage: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen  bg-gradient-to-r from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 ">
      {/* Hero Section */}
      <div className="container pt-32 pb-20">
        {/* Content */}
        <div className="max-w-[800px] mx-auto text-center space-y-8 mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Organize your work,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
                One task at a time
              </span>
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-[350px] mx-auto bg-violet-600  bg-opacity-10 p-2 rounded-full border-2 border-violet-600">
              <span className="text-slate-600 dark:text-white">
                Streamline Your Workflow with{" "}
              </span>
              <span className="text-purple-500">BRAINWAVE</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ?
              -(
                <Button size="lg" asChild>
                  <Link href="/projects" className="gap-2">
                    View Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )
            : <>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                  asChild
                >
                  <Link href="/create-account" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-500"
                  asChild
                >
                  <Link href="/login">Sign in</Link>
                </Button>
              </>
            }
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-6 max-w-[600px] mx-auto ">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3  p-3 rounded-full shadow-md transition hover:scale-105 hover:shadow-lg"
              >
                <CheckCircle2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-800 dark:text-gray-300 font-medium bg-opacity-20">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* App Screenshot with Fade Effect */}
        {/* <div className="relative w-full max-w-[1200px] mx-auto mt-20">
          <div className="relative">
            <div className="relative bg-background/95 backdrop-blur rounded-lg shadow-2xl">
              <Image
                src={
                  resolvedTheme === "dark" ? "/projex-dark.png" : (
                    "/projex-light.png"
                  )
                }
                alt="App preview"
                width={1824}
                height={1080}
                className="rounded-lg w-full"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"></div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Background Gradient Effect */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-purple-400/5 to-background"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[40rem] w-[40rem] rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>
      </div>

      <div className="h-full w-full bg-gradient-to-r from-violet-100 to-purple-200 dark:from-slate-900 dark:to-slate-800  shadow-inner border">
        <div className="relative pt-8">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-extrabold text-gradient-radial from-blue-600 to-violet-400 relative inline-block">
              Features
              <span className="absolute left-1/2 bottom-0 w-20 h-1 bg-violet-600 dark:bg-violet-400 rounded-full transform -translate-x-1/2 animate-pulse mt-2"></span>
            </h1>
            <p className="mt-4 text-lg text-black/80 dark:text-white/80 max-w-2xl mx-auto">
              Discover the powerful capabilities of Brainwave AI, designed to
              optimize workflow automation and enhance productivity.
            </p>
          </div>
        </div>

        <StickyScrollRevealDemo />
      </div>

      <div className="h-full w-full bg-gradient-to-r from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-700 pt-10 pb-10 shadow-inner border">
        <div className="container py-15">
          <h1 className="text-[40px] font-bold text-center pt-10">
            <TypingAnimation>You Can Also Try.....</TypingAnimation>
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          <div>
            <Image
              src="/123.webp"
              alt="Pricing"
              width={500}
              height={500}
              className="rounded-lg"
            ></Image>
          </div>
          <div className="flex flex-col gap-10">
            <BoxRevealDemo />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brand Section */}
            <div>
              <h2 className="text-xl font-semibold">Brainwave AI</h2>
              <p className="text-sm mt-2 text-gray-400">
                Capture, organize, and automate your workflow effortlessly.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-violet-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-violet-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-violet-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-violet-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="mt-2 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Brainwave AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
