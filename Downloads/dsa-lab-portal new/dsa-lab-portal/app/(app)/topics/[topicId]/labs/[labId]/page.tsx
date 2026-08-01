"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getLab, getTopic } from "@/lib/content";
import ConceptBlock from "@/components/ConceptBlock";
import ExerciseRunner from "@/components/ExerciseRunner";
import { markLabComplete, recordAttempt } from "@/lib/progress";

export default function LabPage() {
  const params = useParams<{ topicId: string; labId: string }>();
  const topic = getTopic(params.topicId);
  const lab = getLab(params.topicId, params.labId);
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
    })();
  }, []);

  if (!topic || !lab) return notFound();

  async function handlePass() {
    if (!userId || !topic || !lab) return;
    await markLabComplete(userId, topic.id, lab.id);
    setJustCompleted(true);
  }

  async function handleAttempt() {
    if (!userId || !topic || !lab) return;
    await recordAttempt(userId, topic.id, lab.id);
  }

  return (
    <div className="p-10 max-w-3xl">
      <Link href={`/topics/${topic.id}`} className="text-sm text-brand-600">
        ← {topic.title}
      </Link>
      <h1 className="text-3xl font-bold mt-3">{lab.title}</h1>
      <p className="text-gray-500 mt-1">{lab.summary}</p>

      {justCompleted && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          🎉 Nice work — this lab is marked complete and synced to your account.
        </div>
      )}

      <div className="card p-6 mt-8 space-y-6">
        <h2 className="font-semibold text-gray-400 text-xs uppercase tracking-wide">Concepts</h2>
        {lab.concepts.map((block, i) => (
          <ConceptBlock key={i} block={block} index={i} />
        ))}
      </div>

      <div className="card p-6 mt-6">
        <h2 className="font-semibold text-gray-400 text-xs uppercase tracking-wide mb-4">Exercise</h2>
        <ExerciseRunner exercise={lab.exercise} onPass={handlePass} onAttempt={handleAttempt} />
      </div>
    </div>
  );
}
