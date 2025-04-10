'use client';

import { ShieldCheck, Lock, Eye, Brain, Zap, Search, Layers3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyAndFeatures() {
  return (
    <section className="relative py-16 px-6 md:px-10 bg-gradient-to-r from-violet-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl overflow-hidden">
      {/* Plus grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'9\' width=\'2\' height=\'20\' fill=\'%23A78BFA\' opacity=\'0.1\'/%3E%3Crect y=\'9\' width=\'20\' height=\'2\' fill=\'%23A78BFA\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Your knowledge stays private and secure
        </h2>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-10">
          We take privacy seriously. Your data is fully encrypted, never shared
          with third parties. Even on the hosted version, we securely store
          your data in our own servers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Feature icon={<ShieldCheck />} title="End-to-end encryption" />
          <Feature icon={<Lock />} title="Self-hosted option available" />
          <Feature icon={<Eye />} title="Zero knowledge architecture" />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Self-host Supermemory
          </Button>
          <Button variant="outline" className="dark:border-gray-700 dark:text-white">
            Our architecture
          </Button>
          <Button variant="ghost" className="text-violet-700 dark:text-violet-400">
            Check out the code
          </Button>
        </div>

        {/* Features Section */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Brainwave AI Highlights
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <Feature
            icon={<Brain />}
            title="Smart Knowledge Capture"
            description="Automatically save and organize insights, tweets, docs, and more from across your tools."
          />
          <Feature
            icon={<Zap />}
            title="Workflow Automation"
            description="Trigger Notion, Discord, or GitHub actions with AI-driven automations."
          />
          <Feature
            icon={<Search />}
            title="Super Search"
            description="Instantly find anything from your saved content — powered by semantic understanding."
          />
          <Feature
            icon={<Layers3 />}
            title="Knowledge Canvas"
            description="Visualize your ideas and content in a freeform, interconnected space."
          />
          <Feature
            icon={<Lock />}
            title="Data Ownership"
            description="You control your data. Self-hosting and local encryption are first-class citizens."
          />
          <Feature
            icon={<ShieldCheck />}
            title="Privacy First"
            description="Built with privacy at the core. No trackers, no cloud syncs unless you allow it."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-800/30 text-violet-600 dark:text-violet-400">
        {icon}
      </div>
      <h4 className="text-md font-semibold text-gray-800 dark:text-white">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}
