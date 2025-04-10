'use client';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ProjectActions } from './ProjectActions';
import { useProjectAccess } from '@/hooks/useProjectAccess';
import { ProjectAction } from '@/consts';
import { Folder, FileText, CalendarDays, Lock, CheckCircle } from "lucide-react";

interface ProjectItemProps {
  project: IProject;
  tab: 'active' | 'all' | 'closed';
  setProjectToClose?: (id: string) => void;
  setProjectToReopen?: (id: string) => void;
  setProjectToDelete?: (project: IProject) => void;
}


export const ProjectItem = ({
  project,
  tab,
  setProjectToClose,
  setProjectToReopen,
  setProjectToDelete,
}: ProjectItemProps) => {
  const { can } = useProjectAccess({ projectId: project.id });

  return (
    <div className="p-6 border-b border-muted flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white dark:bg-slate-900 hover:shadow-sm transition-shadow rounded-md">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <Folder className="w-5 h-5 text-violet-600" />
          {project.closed ? (
            <h1 className="text-lg font-semibold text-gray-400 line-through">
              {project.name}
            </h1>
          ) : (
            <Link href={`/projects/${project.id}`}>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white hover:underline">
                {project.name}
              </h1>
            </Link>
          )}
          {tab === "all" && (
            <Badge className="flex items-center gap-1 text-xs border border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400 bg-transparent dark:bg-transparent">
              {project.closed ? (
                <>
                  <Lock className="w-3 h-3" /> Closed
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3" /> Active
                </>
              )}
            </Badge>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
          <FileText className="w-4 h-4" />
          <p className="line-clamp-2">{project.description}</p>
        </div>

        <div className="flex items-center text-xs text-muted-foreground gap-2">
          <CalendarDays className="w-4 h-4" />
          <p>Created on {new Date(project.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {can(ProjectAction.CLOSE_PROJECT) && (
        <div className="self-end md:self-auto">
          <ProjectActions
            project={project}
            tab={tab}
            setProjectToClose={setProjectToClose}
            setProjectToReopen={setProjectToReopen}
            setProjectToDelete={setProjectToDelete}
          />
        </div>
      )}
    </div>
  );
};
