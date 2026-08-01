import { Topic } from "./types";

export const dataTopics: Topic[] = [
  {
    id: "sql",
    title: "SQL (Structured Query Language)",
    emoji: "🗄️",
    colorFrom: "from-blue-500",
    labs: [
      {
        id: "sql-i-core-foundations",
        title: "SQL I: Core Foundations",
        summary: "Tables, rows, columns, and your first SELECT queries.",
        concepts: [
          {
            heading: "What is a relational database?",
            body: "It organises data into tables (like spreadsheets) that can be linked together based on shared columns. Each table has rows (individual records) and columns (the attributes describing them).",
          },
          {
            heading: "Primary Keys",
            body: "A Primary Key (PK) is a column that uniquely identifies each row — no duplicates, no blanks. Think of it as a passport number: exactly one per person, never repeated.",
          },
          {
            heading: "SELECT: asking questions of your data",
            body: "SELECT column_names FROM table_name is the basic shape of almost every query. Add WHERE to filter rows, and ORDER BY to sort the results.",
          },
        ],
        exercise: {
          type: "sql",
          instructions:
            "The 'members' table has columns: id, name, year, points. Write a query that returns the name and points of every member with more than 50 points, ordered by points from highest to lowest.",
          seedSql: `CREATE TABLE members (id INTEGER, name TEXT, year INTEGER, points INTEGER);
INSERT INTO members VALUES
  (1, 'Ravi', 2, 80),
  (2, 'Mei', 1, 45),
  (3, 'Aiden', 3, 60),
  (4, 'Siti', 2, 30),
  (5, 'Farah', 1, 95);`,
          starterQuery: "SELECT name, points\nFROM members\nWHERE points > 50\nORDER BY points DESC;",
          expectedRows: [
            { name: "Farah", points: 95 },
            { name: "Ravi", points: 80 },
            { name: "Aiden", points: 60 },
          ],
          hint: "WHERE filters rows before they're returned; ORDER BY ... DESC sorts highest first.",
        },
      },
      {
        id: "sql-ii-joins-crud",
        title: "SQL II: Joins & CRUD",
        summary: "Connecting tables with JOINs, and Create/Read/Update/Delete basics.",
        concepts: [
          {
            heading: "Foreign Keys link tables",
            body: "A Foreign Key (FK) is a column in one table that points to a Primary Key in another, creating a relationship between them — like a flight manifest linking your passport number to a seat.",
          },
          {
            heading: "INNER JOIN",
            body: "An INNER JOIN combines rows from two tables where a matching value exists in both — it returns only the intersection, not every row from either side.",
          },
          {
            heading: "CRUD",
            body: "Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) are the four basic operations you'll perform on any database.",
          },
        ],
        exercise: {
          type: "sql",
          instructions:
            "Two tables: members(id, name) and attendance(member_id, session). Write a query that returns each member's name alongside the session they attended, using an INNER JOIN.",
          seedSql: `CREATE TABLE members (id INTEGER, name TEXT);
CREATE TABLE attendance (member_id INTEGER, session TEXT);
INSERT INTO members VALUES (1, 'Ravi'), (2, 'Mei'), (3, 'Aiden');
INSERT INTO attendance VALUES (1, 'Session 1'), (2, 'Session 1'), (1, 'Session 2');`,
          starterQuery:
            "SELECT members.name, attendance.session\nFROM members\nINNER JOIN attendance ON members.id = attendance.member_id;",
          expectedRows: [
            { name: "Ravi", session: "Session 1" },
            { name: "Mei", session: "Session 1" },
            { name: "Ravi", session: "Session 2" },
          ],
          hint: "INNER JOIN ... ON table1.col = table2.col matches rows across both tables.",
        },
      },
    ],
  },
  {
    id: "eda",
    title: "EDA (Exploratory Data Analysis)",
    emoji: "🔍",
    colorFrom: "from-emerald-500",
    labs: [
      {
        id: "eda-with-python",
        title: "Exploratory Data Analysis with Python",
        summary: "Investigating a dataset's structure and quality before modelling it.",
        concepts: [
          {
            heading: "What is EDA?",
            body: "EDA is the process of examining a dataset before building any model or making decisions from it — understanding its structure, spotting quality issues, and finding simple patterns.",
          },
          {
            heading: "Why it matters",
            body: "Catching anomalies (missing values, wrong data types, outliers) early prevents much bigger errors later, when a flawed model is already deployed.",
          },
          {
            heading: "Pandas is your microscope",
            body: "In Python, the pandas library loads tabular data into a DataFrame. Methods like .describe() and .mean() are the fastest way to get a first look at what you're working with.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "A list of session attendance counts is given. Print the average (mean) attendance, rounded to 1 decimal place.",
          starterCode:
            "attendance = [42, 38, 45, 50, 33, 47, 41]\n\n# calculate and print the average, rounded to 1 decimal place\n",
          expectedStdout: "42.3",
          hint: "average = sum(attendance) / len(attendance), then round(average, 1)",
        },
      },
    ],
  },
  {
    id: "eda-visualization",
    title: "EDA & Visualization",
    emoji: "📊",
    colorFrom: "from-teal-500",
    labs: [
      {
        id: "eda-visualization",
        title: "EDA & Visualization",
        summary: "Choosing the right chart to make a dataset's story visible.",
        concepts: [
          {
            heading: "Why charts?",
            body: "People spot patterns in charts far faster than in raw tables. A well-chosen chart can expose trends, group differences, and outliers almost instantly.",
          },
          {
            heading: "The core rule",
            body: "The right chart depends on the question you're asking, not on which chart looks nicest. A chart should make data easier to understand — if it doesn't, it's the wrong chart.",
          },
          {
            heading: "Common chart types",
            body: "Line charts show trends over time. Bar charts compare categories. Histograms show the distribution of a single numeric variable. Scatter plots show the relationship between two numeric variables.",
          },
        ],
        exercise: {
          type: "mcq",
          question:
            "You want to show how club membership has grown month over month for the past year. Which chart type fits best?",
          options: ["Bar chart", "Line chart", "Scatter plot", "Pie chart"],
          correctIndex: 1,
          explanation:
            "Line charts are built for showing a trend across a continuous sequence like time — the connecting line makes the trajectory immediately visible.",
        },
      },
    ],
  },
  {
    id: "webscraping",
    title: "Webscraping",
    emoji: "🕸️",
    colorFrom: "from-indigo-500",
    labs: [
      {
        id: "intro-webscraping",
        title: "Introduction to Webscraping",
        summary: "Turning unstructured web pages into structured data.",
        concepts: [
          {
            heading: "What is web scraping?",
            body: "Web scraping is the automated extraction of data from websites: sending a request to a page, parsing its HTML structure, and pulling out the specific information you need.",
          },
          {
            heading: "The general flow",
            body: "1) Request a webpage. 2) Parse its HTML/CSS structure. 3) Extract the fields you care about. 4) Save them in a structured format like CSV or JSON.",
          },
          {
            heading: "Parsing HTML in Python",
            body: "The BeautifulSoup library reads HTML text and lets you search it by tag name or class, similar to how you'd use CSS selectors — turning a messy page into clean, structured fields.",
          },
        ],
        exercise: {
          type: "python",
          instructions:
            "A snippet of HTML is provided as a string. Use string methods to extract the text between <title> and </title> and print it.",
          starterCode:
            'html = "<html><head><title>DAC Session 5</title></head><body></body></html>"\n\n# extract and print just the title text: DAC Session 5\n',
          expectedStdout: "DAC Session 5",
          hint: 'Try: html.split("<title>")[1].split("</title>")[0]',
        },
      },
    ],
  },
];
