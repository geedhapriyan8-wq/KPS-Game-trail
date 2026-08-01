import { Topic } from "./types";

export const foundationsTopics: Topic[] = [
  {
    id: "github-python",
    title: "Python + GitHub Integration",
    emoji: "🐙",
    colorFrom: "from-slate-500",
    labs: [
      {
        id: "github-basics",
        title: "GitHub Basics & Your First Python Script",
        summary:
          "What GitHub is, why we use it, and writing/running your first lines of Python.",
        concepts: [
          {
            heading: "What is GitHub?",
            body: "GitHub is a website where people store and share their code online. It's built on top of a tool called Git, which tracks every change you make to your code over time — like a save history you can rewind.",
            analogy:
              "Think of it like Google Docs version history, but for code: every 'commit' is a saved checkpoint you can go back to.",
          },
          {
            heading: "Why does DAC use it?",
            body: "It lets everyone on a project work on the same code without emailing files back and forth, and it doubles as a public portfolio — recruiters often ask for your GitHub profile.",
          },
          {
            heading: "Your first Python line",
            body: "Python code runs top to bottom, line by line. The print() function is how you make Python show you something. Whatever text is inside the quotes gets displayed exactly as written.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "Use print() to output exactly: Hello, DAC! Then on a new line, print your favourite number.",
          starterCode:
            '# Print a greeting to the club\nprint("Hello, DAC!")\n\n# Now print any number you like on its own line\n',
          expectedStdout: "Hello, DAC!",
          hint: "The first line is already done for you — just add one more print() with a number in it.",
        },
      },
    ],
  },
  {
    id: "python-foundations",
    title: "Python",
    emoji: "🐍",
    colorFrom: "from-yellow-500",
    labs: [
      {
        id: "python-core-foundations",
        title: "Python Core Foundations",
        summary:
          "Why Python is the language of data science, and the basics: variables, types, and simple operations.",
        concepts: [
          {
            heading: "Why Python?",
            body: "Python is the most-used language for data science and AI because its syntax reads almost like plain English, and it has huge libraries (Pandas, NumPy, Scikit-Learn) built specifically for working with data.",
          },
          {
            heading: "Variables",
            body: "A variable is a labelled box that stores a value so you can reuse it later. In Python you create one just by writing a name, an equals sign, and a value — no need to declare a type first.",
            analogy: "age = 20 creates a box labelled 'age' containing the number 20.",
          },
          {
            heading: "Common data types",
            body: "int (whole numbers like 5), float (decimals like 5.0), str (text like \"hello\"), and bool (True/False) are the building blocks you'll use constantly.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "Create a variable called name set to \"DAC\", a variable called members set to 40, then print them as: DAC has 40 members",
          starterCode:
            'name = "DAC"\nmembers = 40\n\n# print a sentence combining both variables\n',
          expectedStdout: "DAC has 40 members",
          hint: 'Try: print(name + " has " + str(members) + " members")',
        },
      },
    ],
  },
  {
    id: "ai-ethics",
    title: "AI Ethics",
    emoji: "⚖️",
    colorFrom: "from-rose-500",
    labs: [
      {
        id: "intro-ethics-ai",
        title: "Intro to Ethics in AI",
        summary:
          "Understanding algorithmic bias and why fairness has to be a deliberate design choice, not an afterthought.",
        concepts: [
          {
            heading: "Where does bias come from?",
            body: "AI models learn patterns from historical data. If that data reflects past unfair treatment of a group of people (in hiring, lending, healthcare, etc.), the model will learn and repeat that unfairness — even without anyone intending it to.",
          },
          {
            heading: "Measuring fairness",
            body: "One common metric is Disparate Impact: it compares how often the model gives a favourable outcome to one group versus another. A score close to 1.0 means the groups are treated similarly; a score far from 1.0 signals bias.",
          },
          {
            heading: "Fixing it",
            body: "Techniques like data reweighing adjust how much influence different examples have during training, which can push fairness scores close to 1.0 with only a small trade-off in accuracy.",
          },
        ],
        exercise: {
          type: "mcq",
          question:
            "A hiring model approves 90% of male applicants but only 55% of equally-qualified female applicants. What does this indicate?",
          options: [
            "The model is working correctly since it's just following the data",
            "A disparate impact problem — the model is treating groups unequally",
            "This is unrelated to AI ethics, it's a hiring policy issue",
            "The model needs more training data of any kind to fix this",
          ],
          correctIndex: 1,
          explanation:
            "A large gap in favourable-outcome rates between groups is the textbook definition of disparate impact — a core fairness concern in applied AI.",
        },
      },
    ],
  },
];
