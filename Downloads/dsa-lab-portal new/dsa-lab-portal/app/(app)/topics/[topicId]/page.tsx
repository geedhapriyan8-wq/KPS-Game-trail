"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getTopic } from "@/lib/content";
import { fetchProgress, completedLabIds, ProgressRow } from "@/lib/progress";
import { notFound } from "next/navigation";

export default function TopicPage() {
  const params = useParams<{ topicId: string }>();
  const topic = getTopic(params.topicId);
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

  if (!topic) return notFound();

  const completed = progress ? completedLabIds(progress) : new Set<string>();

  return (
    <div className="p-10 max-w-4xl">
      <Link href="/topics" className="text-sm text-brand-600">← All topics</Link>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-3xl">{topic.emoji}</span>
        <h1 className="text-3xl font-bold">{topic.title}</h1>
      </div>

      <div className="mt-8 space-y-3">
        {topic.labs.map((lab, i) => {
          const isDone = completed.has(lab.id);
          return (
            <Link
              key={lab.id}
              href={`/topics/${topic.id}/labs/${lab.id}`}
              className="card p-5 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isDone ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{lab.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{lab.summary}</p>
                </div>
              </div>
              <span className="text-brand-600 text-sm font-medium">{isDone ? "Review →" : "Start →"}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
