import { Topic } from "./types";

export const mlTopics: Topic[] = [
  {
    id: "intro-ml",
    title: "Intro to Machine Learning",
    emoji: "🤖",
    colorFrom: "from-purple-500",
    labs: [
      {
        id: "intro-to-ml",
        title: "Intro to Machine Learning",
        summary: "What machine learning actually means, and the general pipeline behind it.",
        concepts: [
          {
            heading: "A working definition",
            body: 'Machine learning is "a set of methods that can automatically detect patterns in data to make predictions" (Murphy, 2013). In practice: you train a model on existing data so it can find patterns and make decisions on new data, without being explicitly programmed for every case.',
          },
          {
            heading: "The general ML pipeline",
            body: "Most ML projects follow the same shape: collect data → clean/prepare it (this is EDA) → choose and train a model → evaluate its performance → deploy it. Skipping steps — especially data cleaning — is the most common source of bad models.",
          },
          {
            heading: "Supervised vs. unsupervised",
            body: "Supervised learning trains on labelled examples (you know the right answer during training, e.g. predicting exam scores from study hours). Unsupervised learning finds structure in data with no labels at all (e.g. grouping similar customers together).",
          },
        ],
        exercise: {
          type: "mcq",
          question:
            "You want to predict whether a club member will renew their membership (Yes/No), using past data where you already know who renewed. What type of ML problem is this?",
          options: [
            "Unsupervised learning, because you're finding hidden groups",
            "Supervised learning, because you have labelled outcomes to learn from",
            "Not a machine learning problem at all",
            "Reinforcement learning, because there's a reward signal",
          ],
          correctIndex: 1,
          explanation:
            "Because past renew/didn't-renew labels exist, the model can learn from known outcomes — that's the definition of supervised learning.",
        },
      },
    ],
  },
  {
    id: "ml-algorithms",
    title: "Machine Learning Algorithms",
    emoji: "🌳",
    colorFrom: "from-green-600",
    labs: [
      {
        id: "generalised-linear-models",
        title: "Generalised Linear Models",
        summary: "Fitting a straight line through data with Linear Regression.",
        concepts: [
          {
            heading: "Linear regression, in one sentence",
            body: "Linear regression finds the straight line that best fits your data, so you can predict an output (dependent variable) from an input (independent variable) — e.g. predicting exam score from hours studied.",
          },
          {
            heading: "Slope and intercept",
            body: "A line is defined by y = mx + b, where m is the slope (how steep the line is) and b is the intercept (where it crosses the y-axis). Least Squares finds the m and b that minimise the total error across all points.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "Given hours studied (x) and exam scores (y) below, compute the slope of the least-squares regression line using the formula slope = sum((x-mean_x)*(y-mean_y)) / sum((x-mean_x)**2). Print it rounded to 2 decimal places.",
          starterCode:
            "x = [1, 2, 3, 4, 5]\ny = [52, 58, 63, 70, 74]\n\nmean_x = sum(x) / len(x)\nmean_y = sum(y) / len(y)\n\n# compute the slope using the formula above and print it rounded to 2 dp\n",
          expectedStdout: "5.6",
          hint: "numerator = sum((xi-mean_x)*(yi-mean_y) for xi,yi in zip(x,y)); denominator = sum((xi-mean_x)**2 for xi in x)",
        },
      },
      {
        id: "tree-based-models",
        title: "Tree-Based Models",
        summary: "Decision Trees and the idea of 'purity' behind every split.",
        concepts: [
          {
            heading: "Decision Trees (CART)",
            body: "A Decision Tree predicts an outcome by learning simple if/else rules from the data's features. It's the base building block for more powerful models like Random Forests.",
          },
          {
            heading: "Gini impurity",
            body: "Gini impurity measures how 'mixed' a group is. A group that's all one class has impurity 0 (perfectly pure); a 50/50 mixed group has the highest impurity. A tree picks the split that produces the purest resulting groups.",
            analogy: "A bag of all-red marbles has 0 impurity. A bag with an even mix of red and blue is as impure as it gets.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "Gini impurity for two classes = 1 - (p1**2 + p2**2), where p1 and p2 are the proportion of each class. A group has 8 'renewed' members and 2 'not renewed'. Compute and print the Gini impurity, rounded to 2 decimal places.",
          starterCode:
            "renewed = 8\nnot_renewed = 2\ntotal = renewed + not_renewed\n\n# compute p1, p2, then gini = 1 - (p1**2 + p2**2), print rounded to 2 dp\n",
          expectedStdout: "0.32",
          hint: "p1 = renewed/total, p2 = not_renewed/total",
        },
      },
    ],
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    emoji: "💬",
    colorFrom: "from-orange-500",
    labs: [
      {
        id: "intro-to-nlp-1",
        title: "Introduction to NLP",
        summary: "What makes human language different from code — and how machines process it.",
        concepts: [
          {
            heading: "Natural language vs. formal language",
            body: 'Natural language (speech, written text) evolved organically among humans, full of ambiguity and nuance. This is different from formal languages like mathematical notation or code, which follow strict, unambiguous rules.',
          },
          {
            heading: "What NLP does",
            body: "NLP applies computational techniques to process, analyse, and generate natural language — powering things like translation, question answering, and speech recognition.",
          },
          {
            heading: "Tokenization: step one",
            body: "Before a computer can analyse text, it needs to break it into pieces called tokens — usually words or punctuation marks. In Python, the simplest tokenizer is just .split().",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            'Tokenize the sentence "NLP helps computers understand language" by splitting it into words, and print the number of tokens.',
          starterCode:
            'sentence = "NLP helps computers understand language"\n\n# split into tokens and print how many there are\n',
          expectedStdout: "5",
          hint: "tokens = sentence.split(), then print(len(tokens))",
        },
      },
      {
        id: "intro-to-nlp-2",
        title: "NLP: Word Frequency",
        summary: "Turning raw text into a simple, structured signal: word counts.",
        concepts: [
          {
            heading: "Bag of Words",
            body: "One of the simplest ways to represent text numerically is to just count how often each word appears, ignoring grammar and word order entirely. This is called a 'bag of words' — and despite being simple, it powers a lot of real-world text classification.",
          },
          {
            heading: "Why counting works",
            body: "Certain words tend to appear more often in certain contexts (e.g. 'refund' in complaint emails). Even a basic frequency count can capture useful signal for a model.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            'Given the sentence below, count how many times the word "data" appears (case-insensitive) and print the count.',
          starterCode:
            'sentence = "Data is powerful. Good data leads to good decisions, and bad data leads to bad ones."\n\nwords = sentence.lower().replace(".", "").replace(",", "").split()\n\n# count occurrences of "data" in words and print it\n',
          expectedStdout: "3",
          hint: 'words.count("data")',
        },
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering (Integrating with Multi-Agent DSA)",
    emoji: "✨",
    colorFrom: "from-pink-500",
    labs: [
      {
        id: "prompt-engineering-basics",
        title: "Prompt Engineering Basics",
        summary: "Designing inputs that reliably get useful outputs from an AI model.",
        concepts: [
          {
            heading: "What is prompt engineering?",
            body: "It's the strategic process of designing and refining the instructions (prompts) you give an AI model, to translate what you actually want into something the model can act on accurately.",
          },
          {
            heading: "Why it matters",
            body: "A vague prompt gets a vague, generic answer. A well-structured prompt — with clear role, context, task, and format — gets a precise, usable one, and cuts down the trial-and-error loop.",
          },
          {
            heading: "A simple structure to reuse",
            body: "Good prompts usually include: a Role ('You are a...'), Context (relevant background), a clear Task (what to do), and a Format (how the output should look).",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "Write a prompt (as the variable `prompt`) asking an AI to summarise a DAC session's attendance data, that includes all four elements: a role, context, a task, and a requested output format. The checker code below will grade it — don't edit it.",
          starterCode:
            'prompt = """\nWrite your prompt here. Make sure it includes:\n- a role for the AI (e.g. "You are a data analyst")\n- context (what the data is)\n- a clear task\n- the format you want the answer in\n"""\n\n# --- checker: do not edit below this line ---\ntext = prompt.lower()\nchecks = {\n    "role": "you are" in text,\n    "context": "attendance" in text or "session" in text,\n    "task": "summar" in text,\n    "format": any(w in text for w in ["format", "bullet", "table", "list", "paragraph"]),\n}\nprint("PASS" if all(checks.values()) else "FAIL")\n',
          expectedStdout: "PASS",
          hint: 'Something like: "You are a data analyst. You have attendance data from a DAC session. Summarise attendance trends. Format your answer as a bulleted list."',
        },
      },
      {
        id: "multi-agent-systems",
        title: "Multi-Agent Systems: Connecting Agents Together",
        summary: "Why one AI agent isn't always enough, and how to chain specialised agents into a pipeline.",
        concepts: [
          {
            heading: "What is a multi-agent system?",
            body: "Instead of asking one AI to do an entire complex task in a single prompt, a multi-agent system splits the work across several smaller, specialised agents — each with its own focused role — that pass work to each other to reach a final result.",
            analogy:
              "Think of a newsroom: a researcher gathers facts, an editor checks them, and a writer turns them into an article. No single person does all three jobs at once.",
          },
          {
            heading: "Why split the work up?",
            body: "A single 'do everything' prompt tends to produce shallow results, because the model is juggling too many instructions at once. Specialised agents can each be given sharper, narrower instructions — which usually means better quality at each step, and it's far easier to debug: if the output is wrong, you know exactly which agent to fix.",
          },
          {
            heading: "How agents connect",
            body: "The most common pattern is a pipeline (or 'handoff'): Agent A produces an output, and that output becomes the input to Agent B. More advanced setups add a 'manager' or 'router' agent that decides which specialist agent should handle a given task, or run several agents in parallel and combine their results.",
          },
          {
            heading: "Where this shows up in DSA",
            body: "This is exactly the pattern behind the DAC multi-agent integrations you'll build: for example, a research agent that gathers information, feeding into a writer agent that formats the final response — each agent doing one job well, connected in sequence.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "Two agent functions are already defined below: researcher_agent(topic) returns raw facts, and writer_agent(facts) formats them into a summary. Connect them into a pipeline: call researcher_agent with the topic \"prompt engineering\", pass its output into writer_agent, and print the final result.",
          starterCode:
            'def researcher_agent(topic):\n    """Agent 1: gathers raw facts on a topic."""\n    return f"Facts about {topic}: clear instructions improve output, iteration is key, examples help"\n\n\ndef writer_agent(facts):\n    """Agent 2: turns raw facts into a polished summary."""\n    return f"Summary: {facts}"\n\n\n# Connect the two agents into a pipeline:\n# 1. Call researcher_agent with topic "prompt engineering"\n# 2. Pass its output into writer_agent\n# 3. Print the final result\n',
          expectedStdout:
            "Summary: Facts about prompt engineering: clear instructions improve output, iteration is key, examples help",
          hint: "facts = researcher_agent(\"prompt engineering\"); result = writer_agent(facts); print(result)",
        },
      },
    ],
  },
];
