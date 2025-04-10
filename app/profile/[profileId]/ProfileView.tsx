'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Edit3, UserCircle, Info, Link2 } from 'lucide-react';
import type { IUser } from '@/utils/users';

interface ProfileViewProps {
  user: IUser;
  isOwnProfile: boolean;
}

export function ProfileView({ user, isOwnProfile }: ProfileViewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 pb-8">
      <div className="flex items-center justify-between pt-6 pb-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 shadow-lg border">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-xl font-semibold bg-muted">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-primary" />
              {user.name}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {isOwnProfile && (
          <Button variant="outline" asChild className="gap-2">
            <Link href="/profile">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        )}
      </div>

      {user.description && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-primary" />
            Bio
          </h2>
          <p className="text-base text-muted-foreground">{user.description}</p>
        </div>
      )}

      {user.links && user.links.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Link2 className="w-5 h-5 text-primary" />
            Links
          </h2>
          <div className="flex flex-col gap-2">
            {user.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
