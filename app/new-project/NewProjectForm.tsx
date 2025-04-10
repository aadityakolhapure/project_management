'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateProjectModal } from './CreateProjectModal';
import TextEditor from '@/components/TextEditor';

import {
  FileText,
  Info,
  BookOpen,
  SendHorizonal,
} from 'lucide-react';

export function NewProjectForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [readme, setReadme] = useState('');

  return (
    <div className="space-y-8">
      {/* Project Name */}
      <div className="space-y-2 max-w-xl">
        <Label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <FileText className="w-4 h-4 text-violet-500" />
          Project Name
        </Label>
        <Input
          placeholder="Enter your project name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="shadow-sm focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Description */}
      <div className="space-y-2 max-w-2xl">
        <Label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <Info className="w-4 h-4 text-violet-500" />
          Short Description
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          placeholder="Write a brief description of your project"
          rows={6}
          className="resize-none shadow-sm focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Readme (Rich Text Editor) */}
      <div className="space-y-2 max-w-4xl">
        <Label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <BookOpen className="w-4 h-4 text-violet-500" />
          README
        </Label>
        <TextEditor
          content=""
          onChange={(text) => setReadme(text)}
          isEditable
        />
      </div>

      {/* Submit Button Modal */}
      <div className="pt-4">
      <CreateProjectModal
          projectDetails={{
            name,
            description,
            readme,
          }}
        />
      </div>
    </div>
  );
}
