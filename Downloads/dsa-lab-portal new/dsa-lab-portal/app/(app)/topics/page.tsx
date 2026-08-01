"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { TOPICS } from "@/lib/content";
import { fetchProgress, completedLabIds, topicCompletion, ProgressRow } from "@/lib/progress";

export default function TopicsPage() {
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
    <div className="p-10 max-w-6xl">
      <h1 className="text-3xl font-bold">Topics & Labs</h1>
      <p className="text-gray-500 mt-1">11 topics, {TOPICS.reduce((n, t) => n + t.labs.length, 0)} labs — work through them in any order.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {TOPICS.map((topic) => {
          const { done, total, isComplete } = topicCompletion(topic, completed);
          return (
            <Link key={topic.id} href={`/topics/${topic.id}`} className="card p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.emoji}</span>
                  <div>
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {total} lab{total > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                {isComplete && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">🏅 Badge earned</span>}
              </div>
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500" style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">{done}/{total} complete</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
