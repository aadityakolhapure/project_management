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
    <div className="min-h-screen  bg-gradient-to-r from-violet-50 to-purple-200 dark:from-slate-900 dark:to-slate-800 ">
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
            <p className="text-[15px] text-muted-foreground max-w-[350px] mx-auto bg-violet-600 bg-opacity-10 p-2 rounded-full border-2 border-violet-600">
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
        <div className="relative w-full max-w-[1200px] mx-auto mt-20">
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
        </div>
      </div>

      {/* Background Gradient Effect */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-purple-400/5 to-background"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[40rem] w-[40rem] rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
