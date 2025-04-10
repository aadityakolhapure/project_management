"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useAccessStore } from "@/stores/useAccessStore";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png";

interface HeaderProps {
  className?: string;
}

const supabase = createClient();

export const Header = ({ className }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        useAccessStore.getState().reset();
      }
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60 transition-all",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/projects" : "/"}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:text-primary transition-colors"
        >
          <Image src={logo} alt="Brainwave Logo" width={36} height={36} className="rounded-sm" />
          <span className="hidden sm:inline-block">BRAINWAVE</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Auth Buttons or User Menu */}
          {user ? (
            <UserMenu user={user} />
          ) : (
            isLandingPage && (
              <div className="flex gap-2">
                <Button variant="ghost" asChild className="text-sm px-4">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild className="text-sm px-4">
                  <Link href="/create-account">Get Started</Link>
                </Button>
              </div>
            )
          )}

          {/* Theme Toggle */}
          <div className="pl-3 border-l border-gray-200 dark:border-gray-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
