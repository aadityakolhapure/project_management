"use client";

import { CheckCircle, Github, BookOpen, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function BrainwaveHeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:to-slate-800 shadow-lg">
      {/* Plus Pattern Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[url('/pattern-plus.svg')] bg-repeat opacity-30 dark:opacity-10 pointer-events-none"
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            AI for all your <br />
            <span className="text-violet-600 dark:text-violet-400">
              knowledge & workflow
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 max-w-xl">
            Brainwave AI is your second brain — a supermemory tool that
            collects, organizes, and resurfaces everything you care about.
            Unlock seamless productivity with AI.
          </p>

          {/* <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Whether you're managing tasks in Trello, tracking issues in Jira,
            collaborating in Asana, or planning your week on Monday.com —
            Brainwave integrates smoothly to keep your projects flowing.
          </p> */}

          {/* Features */}
          {/* <ul className="mt-8 space-y-5">
            {[
              "Connect with Notion, GitHub, Google Drive, and Discord",
              "Integrates with Trello, Asana, Jira, and Monday.com",
              "Automate workflows and task tracking with AI",
              "Find anything instantly with AI-powered memory search",
              "Collaborate or keep it private — your data, your control",
            ].map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-slate-800 dark:text-slate-200 text-base"
              >
                <CheckCircle className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-1 shrink-0" />
                {feature}
              </li>
            ))}
          </ul> */}

          {/* Call to Action */}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/register">
              <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
                <PlayCircle className="w-5 h-5" />
                Get started for free
              </button>
            </Link>

            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-violet-700 dark:text-violet-400 hover:underline font-medium"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-violet-700 dark:text-violet-400 hover:underline font-medium"
            >
              <BookOpen className="w-4 h-4" />
              Documentation
            </a>
          </div>
        </div>

        {/* Video or Demo Area */}
        <div className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 aspect-video flex items-center justify-center relative border border-violet-500/20">
  <video
    className="w-full h-full object-cover"
    src="/BRAINWAVE.mp4"
    autoPlay
    loop
    muted
    playsInline
  />
</div>

      </div>
    </section>
  );
}
