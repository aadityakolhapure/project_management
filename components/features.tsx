"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  //   {
  //     title: "AI-Powered Knowledge Management",
  //     description:
  //       "Capture, organize, and resurface information seamlessly. Brainwave AI intelligently categorizes bookmarks, tweets, and web content, making knowledge retrieval effortless. Never lose track of important insights again.",
  //     content: (
  //       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
  //         AI-Powered Knowledge Management
  //       </div>
  //     ),
  //   },
  {
    title: "Intuitive Kanban Boards",
    description:
      "Organize tasks visually with Brainwave AI’s smart Kanban boards. Drag, drop, and automate task movement based on priority, deadlines, and AI-powered recommendations. Stay productive with a seamless workflow.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white ">
        <Image
          src="/board.png"
          width={300}
          height={300}
          className="h-full w-full object-cover border-violet-700 border-2 border-rounded-md"
          alt="Automated Workflow"
        />
      </div>
    ),
  },
  // {
  //   title: "Automated Workflow Integration",
  //   description:
  //     "Streamline your processes with automated workflows. Brainwave AI integrates with Notion, Google Drive, GitHub, and Discord, ensuring that your projects stay updated without manual effort. Focus on innovation while automation handles the rest.",
  //   content: (
  //     <div className="flex h-full w-full items-center justify-center text-white">
  //       <Image
  //         src="/workflow-automation.webp"
  //         width={300}
  //         height={300}
  //         className="h-full w-full object-cover"
  //         alt="Automated Workflow"
  //       />
  //     </div>
  //   ),
  // },
  {
    title: "Real-Time Collaboration",
    description:
      "Experience real-world collaboration with your team in real-time. Work together on documents, assign tasks, and track changes effortlessly. Brainwave AI ensures everyone stays in sync—no matter where they are.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/collab.png"
          width={500}
          height={300}
          className="h-full w-full object-cover border-violet-700 border-2 border-rounded-md"
          alt="Automated Workflow"
        />
      </div>
    ),
  },
  {
    title: "Intelligent Task Management",
    description:
      "Manage your tasks effectively with AI-driven prioritization. Brainwave AI helps you stay on top of deadlines, track progress, and optimize productivity with smart reminders and task suggestions.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/timeline.png"
          width={500}
          height={300}
          className="h-full w-full object-cover border-violet-700 border-2 border-rounded-md"
          alt="Automated Workflow"
        />
      </div>
    ),
  },
  {
    title: "Privacy-Focused & Self-Hosted",
    description:
      "Take control of your data. Brainwave AI offers self-hosting options, ensuring privacy and security. Your data remains in your hands, with end-to-end encryption and customizable access control.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--gray-800),var(--gray-900))] text-white">
        Privacy-Focused & Self-Hosted
      </div>
    ),
  },
];

export default content;

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
