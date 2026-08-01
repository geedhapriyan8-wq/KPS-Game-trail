"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { fetchProgress, overallStats, ProgressRow } from "@/lib/progress";
import { TOTAL_LAB_COUNT, TOTAL_TOPIC_COUNT } from "@/lib/content";

export default function MasterBadgePage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<ProgressRow[] | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setProgress(await fetchProgress(user.id));
    })();
  }, []);

  const stats = progress ? overallStats(progress) : null;

  return (
    <div className="p-10 max-w-3xl">
      <div className="card p-12 text-center">
        <div
          className={`text-7xl mx-auto ${stats?.masterBadgeEarned ? "" : "opacity-30 grayscale"}`}
        >
          🏆
        </div>
        <h1 className="text-2xl font-bold mt-4 text-brand-700">DAC Master Badge</h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Complete all {TOTAL_LAB_COUNT} labs across all {TOTAL_TOPIC_COUNT} topics to earn this
          prestigious badge and prove your mastery of AI & Machine Learning!
        </p>
        {stats && (
          <p className="mt-6 text-sm text-gray-400">
            {stats.labsCompleted}/{stats.totalLabs} labs · {stats.topicsMastered}/{stats.totalTopics}{" "}
            topics mastered
          </p>
        )}
        {stats?.masterBadgeEarned && (
          <p className="mt-4 text-green-600 font-medium">🎉 Congratulations — you've earned it!</p>
        )}
      </div>
    </div>
  );
}
