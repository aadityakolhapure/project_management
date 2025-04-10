'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { projects } from '@/utils/projects';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloseProjectDialog } from '../../components/CloseProjectDialog';
import { DeleteProjectDialog } from '../../components/DeleteProjectDialog';
import TextEditor from '@/components/TextEditor';
import { useProjectAccess } from '@/hooks/useProjectAccess';
import { useAccessStore } from '@/stores/useAccessStore';
import { ProjectAction } from '@/consts';
import {
  FileEdit,
  FileText,
  Info,
  Lock,
  Trash2,
  Save,
  FolderX,
} from 'lucide-react';

interface ProjectSettingsFormProps {
  project: IProject;
}

export function ProjectSettingsForm({ project }: ProjectSettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    readme: project.readme,
  });

  const { toast } = useToast();
  const router = useRouter();
  const { can, role, isLoading } = useProjectAccess({
    projectId: project.id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!can(ProjectAction.VIEW_SETTINGS)) {
    return (
      <div className="text-red-500 text-sm flex items-center gap-2">
        <Lock className="w-4 h-4" />
        You don&apos;t have permission to manage project settings.
      </div>
    );
  }

  const handleUpdateProject = async () => {
    try {
      setIsSaving(true);
      await projects.management.update(project.id, formData);
      toast({
        title: 'Success',
        description: 'Project settings updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update project settings',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseProject = async () => {
    try {
      await projects.management.close(project.id);
      toast({
        title: 'Success',
        description: 'Project closed successfully',
      });
      router.push('/projects');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to close project',
      });
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projects.management.delete(project.id);
      useAccessStore.getState().reset();
      router.push('/projects');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete project',
      });
    }
  };

  return (
    <>
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <FileEdit className="w-4 h-4 text-primary" />
            Project Name
          </Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Info className="w-4 h-4 text-primary" />
            Description
          </Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <FileText className="w-4 h-4 text-primary" />
            README
          </Label>
          <TextEditor
            content={formData.readme}
            onChange={(text) =>
              setFormData((prev) => ({ ...prev, readme: text }))
            }
            isEditable
          />
        </div>

        <Button
          onClick={handleUpdateProject}
          disabled={isSaving}
          className={cn(secondaryBtnStyles, 'gap-2')}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* DANGER ZONE */}
      <div className="my-20">
        <h1 className="text-xl my-4 font-semibold flex items-center gap-2 text-red-600 dark:text-red-400">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h1>
        <div className="border border-red-500 dark:border-red-400 rounded-md divide-y divide-red-400 dark:divide-red-300">
          {can(ProjectAction.CLOSE_PROJECT) && (
            <div className="flex justify-between items-center px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Close Project
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Closing a project will disable its workflows and remove it from
                  the list of open projects.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-red-500 dark:text-red-400 hover:underline"
                onClick={() => setShowCloseDialog(true)}
              >
                <FolderX className="w-4 h-4 mr-1" />
                Close
              </Button>
            </div>
          )}

          {can(ProjectAction.DELETE_PROJECT) && (
            <div className="flex justify-between items-center px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Delete Project
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Once you delete a project, there is no going back. Please be
                  absolutely certain.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-red-500 dark:text-red-400 hover:underline"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <CloseProjectDialog
        open={showCloseDialog}
        onOpenChange={setShowCloseDialog}
        onConfirm={handleCloseProject}
      />

      <DeleteProjectDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteProject}
        projectName={project.name}
      />
    </>
  );
}
