'use client';

import { EmptyProjectList } from './components/EmptyProjectList';
import { ProjectItem } from './components/ProjectItem';
import { ProjectListHeader } from './components/ProjectListHeader';

interface ProjectListProps {
  tab: 'active' | 'all' | 'closed';
  projects: IProject[];
  sortOrder: 'newest' | 'oldest';
  onSort?: (order: 'newest' | 'oldest') => void;
  setProjectToClose?: (id: string) => void;
  setProjectToReopen?: (id: string) => void;
  setProjectToDelete?: (project: IProject) => void;
}

export const ProjectList = ({
  tab,
  projects,
  sortOrder,
  onSort,
  setProjectToClose,
  setProjectToReopen,
  setProjectToDelete,
}: ProjectListProps) => {
  if (projects.length === 0) {
    return <EmptyProjectList tab={tab} />;
  }

  return (
    <div className="border rounded-md">
  <ProjectListHeader
    tab={tab}
    count={projects.length}
    sortOrder={sortOrder}
    onSort={onSort}
  />
  <div>
    {projects.map((project, index) => (
      <div
        key={project.id}
        className={`${
          index % 2 === 0
            ? "bg-white dark:bg-gray-800" // Even → White (Dark: Gray)
            : "bg-purple-50 dark:bg-gray-900" // Odd → Violet (Dark: Deep Violet)
        }`}
      >
        <ProjectItem
          project={project}
          tab={tab}
          setProjectToClose={setProjectToClose}
          setProjectToReopen={setProjectToReopen}
          setProjectToDelete={setProjectToDelete}
        />
      </div>
    ))}
  </div>
</div>

  );
};
