import { foundationsTopics } from "./foundations";
import { dataTopics } from "./data";
import { mlTopics } from "./ml";
import { Topic, Lab } from "./types";

export * from "./types";

export const TOPICS: Topic[] = [
  ...foundationsTopics,
  ...dataTopics,
  ...mlTopics,
];

export const ALL_LABS: { topic: Topic; lab: Lab }[] = TOPICS.flatMap((topic) =>
  topic.labs.map((lab) => ({ topic, lab }))
);

export const TOTAL_LAB_COUNT = ALL_LABS.length;
export const TOTAL_TOPIC_COUNT = TOPICS.length;

export function getTopic(topicId: string): Topic | undefined {
  return TOPICS.find((t) => t.id === topicId);
}

export function getLab(topicId: string, labId: string): Lab | undefined {
  return getTopic(topicId)?.labs.find((l) => l.id === labId);
}

export function getLabById(labId: string): { topic: Topic; lab: Lab } | undefined {
  return ALL_LABS.find((x) => x.lab.id === labId);
}
