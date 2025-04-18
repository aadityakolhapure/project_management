"use client";

import { ProfilePhotoUploader } from "@/components/ProfilePhotoUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { users, type IUser } from "@/utils/users";
import { ExternalLink, Link as LinkIcon, Loader2, X } from "lucide-react";
import { useState } from "react";
import { secondaryBtnStyles } from "../commonStyles";

interface AccountDetailsProps {
  initialData: IUser;
}

export const AccountDetails = ({ initialData }: AccountDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<IUser>(initialData);
  const [formData, setFormData] = useState({
    name: initialData.name,
    description: initialData.description || "",
    links:
      initialData.links?.length > 0
        ? initialData.links
        : [{ id: "", label: "", url: "" }],
  });
  const { toast } = useToast();

  const handleSave = async () => {
    if (!userData) return;

    try {
      setIsSaving(true);
      await users.updateProfile(userData.id, {
        name: formData.name,
        description: formData.description,
        links: formData.links.filter((link) => link.label && link.url),
      });

      setUserData({ ...userData, ...formData });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { id: "", label: "", url: "" }],
    }));
  };

  const removeLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 p-6 border border-violet-200 dark:border-slate-800 rounded-xl shadow-md transition-all">
      <ProfilePhotoUploader
        currentPhotoUrl={userData.avatar}
        userProvider={userData.provider}
        onPhotoUploaded={async (url) => {
          if (!userData) return;
          await users.updateProfile(userData.id, { avatar: url });
          setUserData({ ...userData, avatar: url });
        }}
      />

      {isEditing ? (
        <div className="space-y-6 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Tell us about yourself"
              className="resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Links</label>
            {formData.links.map((link, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  placeholder="Platform"
                  value={link.label}
                  onChange={(e) => updateLink(index, "label", e.target.value)}
                  className="w-[120px]"
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLink}
              className="mt-2"
            >
              Add Link
            </Button>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              className={cn(secondaryBtnStyles)}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center space-y-2 mt-4">
            <h1 className="text-2xl font-semibold">{userData.name}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">{userData.email}</p>
          </div>

          {userData.description && (
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Bio</h2>
              <div className="bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                  {userData.description}
                </p>
              </div>
            </div>
          )}

          {userData.links?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Links</h2>
              <ul className="space-y-2">
                {userData.links.map((link) => (
                  <li key={link.id} className="flex items-center text-sm">
                    <LinkIcon className="w-4 h-4 mr-2 text-violet-500" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              Edit Profile
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
