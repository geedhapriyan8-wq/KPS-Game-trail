"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { TOPICS } from "@/lib/content";
import { fetchProgress, completedLabIds, topicCompletion, ProgressRow } from "@/lib/progress";

export default function BadgesPage() {
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

  const completed = progress ? completedLabIds(progress) : new Set<string>();

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="text-3xl font-bold">My Badges</h1>
      <p className="text-gray-500 mt-1">Complete every lab in a topic to earn its badge.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {TOPICS.map((topic) => {
          const { isComplete, done, total } = topicCompletion(topic, completed);
          return (
            <div
              key={topic.id}
              className={`card p-5 text-center ${!isComplete ? "opacity-50 grayscale" : ""}`}
            >
              <div className="text-4xl">{topic.emoji}</div>
              <p className="text-sm font-semibold mt-3">{topic.title}</p>
              <p className="text-xs text-gray-400 mt-1">
                {isComplete ? "Badge earned 🏅" : `${done}/${total} labs`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
