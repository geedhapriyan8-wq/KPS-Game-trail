"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { TOPICS } from "@/lib/content";
import { fetchProgress, overallStats, completedLabIds, topicCompletion, ProgressRow } from "@/lib/progress";

export default function DashboardPage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<ProgressRow[] | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const p = await fetchProgress(user.id);
      setProgress(p);
    })();
  }, []);

  const stats = progress ? overallStats(progress) : null;
  const completed = progress ? completedLabIds(progress) : new Set<string>();

  return (
    <div className="p-10 max-w-6xl">
      <h1 className="text-3xl font-bold">Learning Dashboard</h1>
      <p className="text-gray-500 mt-1">Track your progress through all AI & ML labs</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <StatCard emoji="📋" value={stats?.labsCompleted ?? 0} label="Labs Completed" />
        <StatCard emoji="🥇" value={stats?.badgesEarned ?? 0} label="Topic Badges Earned" />
        <StatCard emoji="📈" value={`${stats?.overallPct ?? 0}%`} label="Overall Completion" />
        <StatCard emoji="🎯" value={stats?.topicsMastered ?? 0} label="Topics Mastered" />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Continue learning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((topic) => {
            const { done, total, isComplete } = topicCompletion(topic, completed);
            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="card p-5 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{topic.emoji}</span>
                  {isComplete && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Complete</span>}
                </div>
                <h3 className="font-semibold mt-3 text-sm">{topic.title}</h3>
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500"
                    style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {done}/{total} labs
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ emoji, value, label }: { emoji: string; value: string | number; label: string }) {
  return (
    <div className="card p-6">
      <span className="text-2xl">{emoji}</span>
      <p className="text-3xl font-bold mt-3">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
