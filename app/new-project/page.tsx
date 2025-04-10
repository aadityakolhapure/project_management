import { Separator } from '@/components/ui/separator'
import { NewProjectForm } from './NewProjectForm'
import { PlusCircle } from 'lucide-react'

export default function NewProjectPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-4">
        <PlusCircle className="text-violet-600 dark:text-violet-400 w-6 h-6" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Create New Project
        </h1>
      </div>

      <Separator className="my-6" />

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <NewProjectForm />
      </div>
    </div>
  )
}
