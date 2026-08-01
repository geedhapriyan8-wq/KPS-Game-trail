import { createClient } from "@/lib/supabase/client";
import { TOPICS, TOTAL_LAB_COUNT, Topic } from "@/lib/content";

export type ProgressRow = {
  lab_id: string;
  topic_id: string;
  completed: boolean;
  attempts: number;
  completed_at: string | null;
};

export async function fetchProgress(userId: string): Promise<ProgressRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lab_progress")
    .select("lab_id, topic_id, completed, attempts, completed_at")
    .eq("user_id", userId);

  if (error) {
    console.error("fetchProgress error", error);
    return [];
  }
  return data ?? [];
}

export async function markLabComplete(userId: string, topicId: string, labId: string) {
  const supabase = createClient();

  // increment attempts, or start at 1
  const { data: existing } = await supabase
    .from("lab_progress")
    .select("attempts")
    .eq("user_id", userId)
    .eq("lab_id", labId)
    .maybeSingle();

  const { error } = await supabase.from("lab_progress").upsert(
    {
      user_id: userId,
      topic_id: topicId,
      lab_id: labId,
      completed: true,
      attempts: (existing?.attempts ?? 0) + 1,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lab_id" }
  );

  if (error) console.error("markLabComplete error", error);
}

export async function recordAttempt(userId: string, topicId: string, labId: string) {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from("lab_progress")
    .select("attempts, completed")
    .eq("user_id", userId)
    .eq("lab_id", labId)
    .maybeSingle();

  await supabase.from("lab_progress").upsert(
    {
      user_id: userId,
      topic_id: topicId,
      lab_id: labId,
      completed: existing?.completed ?? false,
      attempts: (existing?.attempts ?? 0) + 1,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lab_id" }
  );
}

export function completedLabIds(progress: ProgressRow[]): Set<string> {
  return new Set(progress.filter((p) => p.completed).map((p) => p.lab_id));
}

export function topicCompletion(topic: Topic, completed: Set<string>) {
  const done = topic.labs.filter((l) => completed.has(l.id)).length;
  return { done, total: topic.labs.length, isComplete: done === topic.labs.length };
}

export function overallStats(progress: ProgressRow[]) {
  const completed = completedLabIds(progress);
  const labsCompleted = completed.size;
  const topicsMastered = TOPICS.filter((t) => topicCompletion(t, completed).isComplete).length;
  const badgesEarned = topicsMastered; // one badge per fully-completed topic
  const overallPct = TOTAL_LAB_COUNT === 0 ? 0 : Math.round((labsCompleted / TOTAL_LAB_COUNT) * 100);

  return {
    labsCompleted,
    totalLabs: TOTAL_LAB_COUNT,
    topicsMastered,
    totalTopics: TOPICS.length,
    badgesEarned,
    overallPct,
    masterBadgeEarned: topicsMastered === TOPICS.length,
  };
}
