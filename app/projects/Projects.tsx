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
import { LayoutGrid } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Folder, PlayCircle, XCircle, RefreshCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

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

  const projectDateGraphData = useMemo(() => {
    return availableProjects.map((project) => ({
      name: project.name,
      createdAt: new Date(project.created_at).getTime(), // Convert date to timestamp
    }));
  }, [availableProjects]);

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

  const projectCreationData = useMemo(() => {
    const groupedByDate: { [key: string]: number } = {};

    availableProjects.forEach((project) => {
      const dateStr = new Date(project.created_at).toISOString().split("T")[0]; // YYYY-MM-DD
      groupedByDate[dateStr] = (groupedByDate[dateStr] || 0) + 1;
    });

    const sortedDates = Object.keys(groupedByDate).sort();

    return sortedDates.map((date) => ({
      date,
      count: groupedByDate[date],
    }));
  }, [availableProjects]);

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
                  DASHBOARD
                </h2>
                <div className="mt-1 h-1 w-24 rounded bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* New Project Button */}
                <Link href="/new-project">
                  <Button className="bg-gradient-to-r from-green-500 via-green-500 to-emerald-500 hover:transform hover:scale-105 text-white font-semibold py-2 px-4 rounded shadow flex items-center transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>

                {/* Scroll to Projects Button */}
                <Button
                  className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:transform hover:scale-105 text-white font-semibold py-2 px-4 rounded shadow flex items-center transition-all duration-200"
                  onClick={() => {
                    const el = document.getElementById("project-tabs");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Projects
                </Button>
              </div>
            </div>
          </div>

          <Card className="w-full h-full sm:h-72 mb-6 shadow-md bg-white p-5 dark:bg-zinc-900 border border-muted-foreground/10 rounded-xl hover:shadow-lg transition duration-200">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Project Status Distribution
            </h3>
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
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 mt-6">
            <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 border border-muted-foreground/10 rounded-xl hover:shadow-lg transition duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Folder className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">
                    Total Projects
                  </h4>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {availableProjects.length}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 border border-muted-foreground/10 rounded-xl hover:shadow-lg transition duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <PlayCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">
                    Active Projects
                  </h4>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {activeProjects.length}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 border border-muted-foreground/10 rounded-xl hover:shadow-lg transition duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">
                    Closed Projects
                  </h4>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {closedProjects.length}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 border border-muted-foreground/10 rounded-xl hover:shadow-lg transition duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                  <RefreshCcw className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">
                    Reopened Projects
                  </h4>
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    0
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div id="project-tabs">
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
      </div>

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
