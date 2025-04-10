"use client";

import { useToast } from "@/components/ui/use-toast";
import { projects } from "@/utils/projects";
import { useMemo, useState } from "react";
import { CloseProjectDialog } from "./components/CloseProjectDialog";
import { ProjectTabs } from "./components/ProjectTabs";
import { DeleteProjectDialog } from "./components/DeleteProjectDialog";
import { ReopenProjectDialog } from "./components/ReopenProjectDialog";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = ({
  initialProjects,
}: {
  initialProjects: IProject[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [availableProjects, setAvailableProjects] = useState(initialProjects);
  const [projectToClose, setProjectToClose] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<IProject | null>(null);
  const [projectToReopen, setProjectToReopen] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredProjects = useMemo(() => {
    return availableProjects
      .filter((project) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [availableProjects, searchTerm, sortOrder]);

  const activeProjects = filteredProjects.filter((p) => !p.closed);
  const closedProjects = filteredProjects.filter((p) => p.closed);

  const handleSort = (order: "newest" | "oldest") => {
    setSortOrder(order);
  };

  const handleCloseProject = async () => {
    if (!projectToClose) return;

    try {
      await projects.management.close(projectToClose);
      setAvailableProjects((prev) =>
        prev.map((project) =>
          project.id === projectToClose ? { ...project, closed: true } : project
        )
      );
      toast({
        title: "Success",
        description: "Project closed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to close project. Please try again.",
      });
    } finally {
      setProjectToClose(null);
    }
  };

  const handleReopenProject = async () => {
    if (!projectToReopen) return;
    try {
      await projects.management.reopen(projectToReopen);
      setAvailableProjects((prev) =>
        prev.map((project) =>
          project.id === projectToReopen ?
            { ...project, closed: false }
          : project
        )
      );
      toast({
        title: "Success",
        description: "Project reopened successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reopen project. Please try again.",
      });
    } finally {
      setProjectToReopen(null);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await projects.management.delete(projectToDelete.id);
      setAvailableProjects((prev) =>
        prev.filter((project) => project.id !== projectToDelete.id)
      );
      toast({ title: "Success", description: "Project deleted successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project",
      });
    } finally {
      setProjectToDelete(null);
    }
  };

  const chartData = [
    { name: "Active", value: activeProjects.length },
    { name: "Closed", value: closedProjects.length },
  ];

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

  return (
    <div className="container mx-auto px-1 py-2">
      <Card className="mb-8 shadow-lg rounded-2xl border border-muted-foreground/10 bg-white dark:bg-zinc-900">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Project Status Overview
                </h2>
                <div className="mt-1 h-1 w-24 rounded bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
              </div>

              <Link href="/new-project">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow flex items-center transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full h-[300px] sm:h-[360px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="70%"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "14px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <ProjectTabs
        activeProjects={activeProjects}
        closedProjects={closedProjects}
        allProjects={filteredProjects}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        onSort={handleSort}
        setProjectToClose={setProjectToClose}
        setProjectToReopen={setProjectToReopen}
        setProjectToDelete={setProjectToDelete}
      />

      <CloseProjectDialog
        open={!!projectToClose}
        onOpenChange={() => setProjectToClose(null)}
        onConfirm={handleCloseProject}
      />

      {projectToDelete && (
        <DeleteProjectDialog
          open={!!projectToDelete}
          onOpenChange={() => setProjectToDelete(null)}
          onConfirm={handleDeleteProject}
          projectName={projectToDelete.name}
        />
      )}

      <ReopenProjectDialog
        open={!!projectToReopen}
        onOpenChange={() => setProjectToReopen(null)}
        onConfirm={handleReopenProject}
      />
    </div>
  );
};
