'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {
  Mail,
  User,
  FileText,
  Eye,
  Link2,
  Trash,
  Loader2,
  Plus,
} from 'lucide-react';

import { ProfilePhotoUploader } from '@/components/ProfilePhotoUploader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { primaryBtnStyles } from '../commonStyles';
import { users, type IUser } from '@/utils/users';

const profileFormSchema = z.object({
  name: z.string().max(30, 'Max 30 characters'),
  email: z.string().email(),
  description: z.string().max(160).optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url('Please enter a valid URL.'),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  initialData: IUser;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<IUser>(initialData);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: initialData.email,
      name: initialData.name,
      description: initialData.description || '',
      links: initialData.links?.map(({ label, url }) => ({ label, url })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control: form.control,
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsSaving(true);
      await users.updateProfile(userData.id, {
        name: data.name,
        description: data.description,
        links: data.links?.map((link) => ({
          ...link,
          id: crypto.randomUUID(),
        })),
      });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: 'Please try again later.',
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
        <Button variant="outline" asChild>
          <Link href={`/profile/${userData.id}`} className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View profile
          </Link>
        </Button>
      </div>

      {/* Avatar Upload */}
      <ProfilePhotoUploader
        currentPhotoUrl={userData?.avatar}
        userProvider={userData?.provider}
        onPhotoUploaded={async (url) => {
          await users.updateProfile(userData.id, { avatar: url });
          setUserData({ ...userData, avatar: url });
        }}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" /> Email
                </FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="cursor-not-allowed bg-muted" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-500" /> Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-500" /> Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Links */}
          <div>
            <FormLabel className="flex items-center gap-2 mb-2">
              <Link2 className="w-4 h-4 text-sky-500" /> Social Links
            </FormLabel>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`links.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 mb-2">
                      <FormControl className="w-32">
                        <Input
                          placeholder="Platform"
                          value={field.value.label}
                          onChange={(e) =>
                            field.onChange({ ...field.value, label: e.target.value })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          value={field.value.url}
                          onChange={(e) =>
                            field.onChange({ ...field.value, url: e.target.value })
                          }
                        />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 flex items-center gap-2"
              onClick={() => append({ label: '', url: '' })}
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </div>

          {/* Submit */}
          <Button type="submit" className={primaryBtnStyles} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? 'Saving...' : 'Update Profile'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
