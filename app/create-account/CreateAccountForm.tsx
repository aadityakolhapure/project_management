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

export function CreateAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Passwords do not match',
      });
      return;
    }

    try {
      setIsLoading(true);
      await auth.signUp(email, password);
      toast({
        title: 'Success',
        description: 'Please check your email to verify your account.',
      });
      router.push('/login');
    } catch (error) {
      const { message } = getAuthError(error);

      toast({
        variant: 'destructive',
        title: 'Account Creation Error',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative w-full sm:w-96">
        {/* Wrap the Card and BorderBeam inside a container */}
        <Card className="w-full bg-white shadow-lg rounded-xl p-6">
          <form onSubmit={handleSubmit}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Create an Account
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Enter your email below to sign up
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <p className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-violet-600 hover:text-violet-500 transition">
                  Login
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
                <Label htmlFor="password" className="text-gray-700">Password</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Create Account
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
