export type ConceptBlock = {
  heading: string;
  body: string; // beginner-friendly, plain-English explanation
  analogy?: string; // optional "think of it like..." to anchor the idea
};

export type PythonExercise = {
  type: "python";
  instructions: string;
  starterCode: string;
  expectedStdout: string; // exact-match after trim, per line
  hint?: string;
};

export type SqlExercise = {
  type: "sql";
  instructions: string;
  seedSql: string; // creates + populates the practice table(s)
  starterQuery: string;
  expectedRows: Record<string, unknown>[]; // order-insensitive row match
  hint?: string;
};

export type McqExercise = {
  type: "mcq";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Exercise = PythonExercise | SqlExercise | McqExercise;

export type Lab = {
  id: string;
  title: string;
  summary: string;
  concepts: ConceptBlock[];
  exercise: Exercise;
};

export type Topic = {
  id: string;
  title: string;
  emoji: string;
  colorFrom: string;
  labs: Lab[];
};
