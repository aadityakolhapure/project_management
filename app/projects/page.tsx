import { createClient } from "@/utils/supabase/server";
import { users, type IUser } from "@/utils/users";
import { AccountDetails } from "./AccountDetails";
import { Projects } from "./Projects";
import { redirect } from "next/navigation";
import { projects } from "@/utils/projects";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userData = await users.getUser(user.id);
  if (!userData) redirect("/login");

  const userProjects = await projects.getUserProjects(user.id);

  return (
    <div className="w-[100%] flex flex-col md:flex-row mx-auto p-8 gap-4 relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow-md">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] z-0 pointer-events-none opacity-40" />

      <div className="w-full md:w-72 relative z-10">
        <AccountDetails initialData={userData} />
      </div>

      <div className="flex-1 relative z-10">
        <Projects initialProjects={userProjects} />
      </div>
    </div>
  );
}
