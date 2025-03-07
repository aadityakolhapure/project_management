'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { auth } from '@/utils/auth';
import { useToast } from '@/components/ui/use-toast';
import { getAuthError } from '@/utils/auth-errors';
import { OAuthSignIn } from '@/components/auth/OAuthSignIn';
import { BorderBeam } from '@/components/magicui/border-beam';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await auth.signIn(email, password);
      router.push('/projects');
      router.refresh();
    } catch (error) {
      console.error('Auth error:', error);
      const { message } = getAuthError(error);
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative w-full sm:w-96">
        {/* Wrap the Card and BorderBeam inside a container */}
        <Card className="w-full bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <form onSubmit={handleSubmit}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Log in</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Welcome back! Enter your credentials below
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <p className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/create-account" className="text-violet-600 hover:text-violet-500 transition">
                  Create one
                </Link>
              </p>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-violet-600 hover:text-violet-500 transition">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <Button 
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
                type="submit" 
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </CardContent>

            <CardFooter className="flex justify-center">
              <OAuthSignIn isLoading={isLoading} onLoadingChange={setIsLoading} />
            </CardFooter>
          </form>
        </Card>

        {/* Place the BorderBeam inside this container to ensure it wraps only the card */}
        <BorderBeam duration={8} size={100} className="absolute inset-0" />
      </div>
    </div>
  );
}
