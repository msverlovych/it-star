import type { LearningPath } from "@/data/types";

export const paths: LearningPath[] = [
  {
    slug: "ai",
    title: "AI engineering",
    tagline: "Models, products, judgment.",
    summary:
      "Learn enough Python and machine learning to build features on top of models, then enough of the field to know when a model is the wrong tool.",
    outcome:
      "Ship a small AI feature with an evaluation story, and read a paper without pretending you understood it.",
    ranks: [
      {
        id: "spark",
        stages: [
          {
            id: "ai-python",
            title: "Python before models",
            summary:
              "Models are programs. If Python still feels slippery, every notebook will lie to you. Get fluent enough to read a training script out loud.",
            skills: ["Python", "Notebooks", "Files and data", "Debugging"],
            milestone: "Write a small Python tool that cleans a dataset and tests the boring parts.",
            resources: [
              "python-tutorial",
              "py4e",
              "automate-the-boring-stuff",
              "kaggle-learn",
              "yt-corey-schafer",
            ],
          },
          {
            id: "ai-intuition",
            title: "Intuition before jargon",
            summary:
              "Loss, gradients, and overfitting are ideas, not spells. Build the picture first so later courses have somewhere to land.",
            skills: ["Linear algebra intuition", "Loss", "Overfitting", "Train and test"],
            milestone: "Explain, with a drawing, why a model can ace its training data and fail tomorrow.",
            resources: [
              "google-ml-crash-course",
              "yt-3blue1brown",
              "sklearn-tutorial",
              "cs50-ai",
              "ml-for-beginners",
            ],
          },
        ],
      },
      {
        id: "apprentice",
        stages: [
          {
            id: "ai-train",
            title: "Train something real",
            summary:
              "Stop collecting intros. Train a model on a problem you can measure, and keep a record of what you changed.",
            skills: ["PyTorch or fast.ai", "Metrics", "Data splits", "Baselines"],
            milestone: "Beat a simple baseline on a public dataset and write down why the metric matters.",
            resources: [
              "fastai-course",
              "pytorch-basics",
              "kaggle-learn",
              "python-data-science-handbook",
              "yt-sentdex",
            ],
          },
          {
            id: "ai-inside",
            title: "Look inside the net",
            summary:
              "Use a framework, then build a tiny version yourself. The point is to stop treating the training loop as weather.",
            skills: ["Backprop", "Transformers", "Tensors", "From-scratch practice"],
            milestone: "Implement a minimal network or language model from a blank file, following Karpathy or the D2L book.",
            resources: [
              "nn-zero-to-hero",
              "dive-into-deep-learning",
              "illustrated-transformer",
              "tensorflow-tutorials",
              "yt-karpathy",
            ],
          },
        ],
      },
      {
        id: "knight",
        stages: [
          {
            id: "ai-llms",
            title: "Language models up close",
            summary:
              "Learn what an API actually returns, how prompting fails, and why a demo is not an evaluation.",
            skills: ["Prompting", "Tokens", "APIs", "Hugging Face"],
            milestone: "Call a model API, save the outputs, and show three cases where the prompt breaks.",
            resources: [
              "huggingface-learn",
              "prompting-guide",
              "openai-docs",
              "anthropic-docs",
              "genai-for-beginners",
            ],
          },
          {
            id: "ai-feature",
            title: "Build an AI feature",
            summary:
              "Put a model behind a real interface: retrieval, streaming, and a way for a person to tell you it was wrong.",
            skills: ["RAG", "Streaming UI", "Embeddings", "Local models"],
            milestone: "Ship a small app that answers from a document set you control, with sources visible.",
            resources: ["langchain-docs", "ai-sdk", "pinecone-learn", "gemini-docs", "ollama"],
          },
        ],
      },
      {
        id: "master",
        stages: [
          {
            id: "ai-field",
            title: "Read the field",
            summary:
              "The blog posts expire. Learn to read surveys, course notes, and one hard textbook chapter without a summary account.",
            skills: ["Papers", "Surveys", "Vision and language", "Research taste"],
            milestone: "Read one survey end to end and write a page on what it refuses to claim.",
            resources: ["lilian-weng", "deep-learning-book", "cs231n", "cs224n", "yt-two-minute-papers"],
          },
          {
            id: "ai-production",
            title: "Production judgment",
            summary:
              "Most AI work fails in the data, the evaluation, or the on-call rota. Learn the product shape, not another wrapper library.",
            skills: ["Evals", "MLOps habits", "Failure modes", "Cost"],
            milestone: "Write an eval set for your feature and a one-page decision on what you will not automate.",
            resources: [
              "made-with-ml",
              "fullstack-deep-learning",
              "system-design-primer",
              "sre-book",
              "deeplearning-ai",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "web",
    title: "Web development",
    tagline: "Sites and the services behind them.",
    summary:
      "Go from a blank folder to a full-stack application you can deploy, test, and explain to someone who did not watch you build it.",
    outcome:
      "Ship a full-stack web app with a database, tests, and a public URL you are willing to put your name on.",
    ranks: [
      {
        id: "spark",
        stages: [
          {
            id: "web-document",
            title: "How the web actually works",
            summary:
              "Before frameworks, learn what a browser asks for and what comes back. HTML is the document. HTTP is the conversation.",
            skills: ["HTML", "HTTP", "Semantics", "DevTools"],
            milestone: "Publish a multi-page site that reads well on a phone, with no framework involved.",
            resources: [
              "mdn-learn",
              "web-dev-html",
              "marksheet",
              "web-dev-for-beginners",
              "mdn-http",
            ],
          },
          {
            id: "web-workshop",
            title: "A workshop you can trust",
            summary:
              "The terminal, Git, and an editor are the job. Learn them until a broken environment is a problem you can diagnose.",
            skills: ["Shell", "Git", "Editor", "GitHub"],
            milestone: "Push a repository and open a pull request that another person could review.",
            resources: ["missing-semester", "pro-git", "vscode-docs", "github-docs", "linux-tutorial"],
          },
        ],
      },
      {
        id: "apprentice",
        stages: [
          {
            id: "web-layout",
            title: "Layout as a material",
            summary:
              "CSS is not a list of tricks. Learn flex, grid, and responsive type until you can rebuild a page from a screenshot.",
            skills: ["Flexbox", "Grid", "Responsive design", "Tailwind"],
            milestone: "Rebuild a responsive page you admire, using your own markup and no copied stylesheet.",
            resources: ["web-dev-css", "css-flexbox", "css-grid", "tailwind-docs", "yt-kevin-powell"],
          },
          {
            id: "web-javascript",
            title: "JavaScript with intent",
            summary:
              "Learn the language that runs in the browser: values, functions, the DOM, and asynchronous work.",
            skills: ["JavaScript", "DOM", "Async", "Modules"],
            milestone: "Build a small interactive app with no UI framework and no tutorial open.",
            resources: [
              "javascript-info",
              "freecodecamp",
              "eloquent-javascript",
              "exercism",
              "yt-web-dev-simplified",
            ],
          },
        ],
      },
      {
        id: "knight",
        stages: [
          {
            id: "web-components",
            title: "Components and types",
            summary:
              "Pick React and TypeScript and learn them from the official material. The goal is a UI you can change without fear.",
            skills: ["React", "TypeScript", "Routing", "Components"],
            milestone: "Build a typed multi-page interface and deploy it.",
            resources: ["react-learn", "typescript-handbook", "next-learn", "odin-project", "yt-fireship"],
          },
          {
            id: "web-server",
            title: "The other half of the request",
            summary:
              "A website that only lives in the browser is half a product. Add an API, a database, and a login you understand.",
            skills: ["Node", "SQL", "CRUD", "Auth basics"],
            milestone: "Ship a CRUD app with Postgres and authentication, and draw the request path.",
            resources: ["fullstackopen", "node-learn", "sqlbolt", "postgres-docs", "prisma-docs"],
          },
        ],
      },
      {
        id: "master",
        stages: [
          {
            id: "web-quality",
            title: "Proof it works for people",
            summary:
              "Tests, accessibility, and performance are how you keep a promise after the demo. Learn to measure all three.",
            skills: ["Testing", "Accessibility", "Performance", "Playwright"],
            milestone: "Add automated tests plus an accessibility and performance pass you can show.",
            resources: ["testing-library", "playwright-docs", "web-dev-a11y", "web-dev-perf", "a11y-project"],
          },
          {
            id: "web-operate",
            title: "Leave it running",
            summary:
              "Deploy, automate the boring checks, and learn the short list of ways web apps get broken into.",
            skills: ["Docker", "CI", "Deploy", "OWASP"],
            milestone: "Production deploy with CI, and a written note on the threats you considered.",
            resources: [
              "docker-get-started",
              "github-actions",
              "vercel-docs",
              "owasp-top-10",
              "system-design-primer",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend",
    tagline: "Interfaces that feel fast and kind.",
    summary:
      "Specialize in the part of the web a person touches: markup, CSS, React, design systems, and the quality bar around them.",
    outcome:
      "Build a polished, accessible frontend with a design system, tests, and a performance budget.",
    ranks: [
      {
        id: "spark",
        stages: [
          {
            id: "fe-meaning",
            title: "Documents with meaning",
            summary:
              "Frontend work starts as HTML. If the document is wrong, no amount of styling will make it kind.",
            skills: ["Semantic HTML", "Forms", "Accessibility basics", "Content structure"],
            milestone: "Mark up a real article and a form so they work with a keyboard and a screen reader.",
            resources: ["mdn-learn", "web-dev-html", "wai-fundamentals", "marksheet"],
          },
          {
            id: "fe-css",
            title: "CSS you can defend",
            summary:
              "Learn layout, cascade, and responsive design until you can explain why a rule won.",
            skills: ["Cascade", "Flexbox", "Grid", "Defensive CSS"],
            milestone: "Recreate a complex responsive layout without a framework and without magic numbers you cannot explain.",
            resources: ["web-dev-css", "css-flexbox", "css-grid", "defensive-css", "yt-kevin-powell"],
          },
        ],
      },
      {
        id: "apprentice",
        stages: [
          {
            id: "fe-language",
            title: "The language",
            summary:
              "JavaScript is the material. Learn scope, types, async, and modules well enough to debug without guessing.",
            skills: ["Scope", "Types", "Async", "Modules"],
            milestone: "Finish a language tutorial and a set of exercises with the solutions closed.",
            resources: ["javascript-info", "you-dont-know-js", "eloquent-javascript", "exercism"],
          },
          {
            id: "fe-react",
            title: "React and TypeScript",
            summary:
              "Components, state, and types. Learn the official React path, then let TypeScript make the edges honest.",
            skills: ["React", "State", "TypeScript", "Props"],
            milestone: "Build a typed component UI for a small product idea, with loading and empty states.",
            resources: ["react-learn", "typescript-handbook", "total-typescript", "yt-net-ninja"],
          },
        ],
      },
      {
        id: "knight",
        stages: [
          {
            id: "fe-framework",
            title: "An application framework",
            summary:
              "Next.js, data fetching, and validation. The framework should remove chores, not understanding.",
            skills: ["Next.js", "Data fetching", "Validation", "Routing"],
            milestone: "Ship a multi-route app that loads remote data and validates what the person typed.",
            resources: ["next-docs", "next-learn", "tanstack-query", "zod-docs"],
          },
          {
            id: "fe-systems",
            title: "Interface systems",
            summary:
              "Design systems, accessible primitives, and motion. Learn to build pieces other people can reuse.",
            skills: ["Tailwind", "Radix", "Design tokens", "Motion"],
            milestone: "Assemble a small component set and use it on two screens that share nothing but the system.",
            resources: ["tailwind-docs", "shadcn-docs", "radix-primitives", "figma", "motion-docs"],
          },
        ],
      },
      {
        id: "master",
        stages: [
          {
            id: "fe-quality",
            title: "The quality bar",
            summary:
              "Testing, accessibility, and component isolation. This is the work that makes a frontend professional.",
            skills: ["Testing Library", "Playwright", "Storybook", "Inclusive patterns"],
            milestone: "Cover the critical UI with tests and fix every keyboard trap you can find.",
            resources: [
              "testing-library",
              "playwright-docs",
              "storybook-docs",
              "inclusive-components",
              "web-dev-a11y",
            ],
          },
          {
            id: "fe-judgment",
            title: "Speed and judgment",
            summary:
              "Performance, patterns, and the essays of people who have maintained large frontends. Learn what to refuse.",
            skills: ["Performance", "Patterns", "Profiling", "Architecture"],
            milestone: "Profile a page, fix one real cost, and write the decision down.",
            resources: ["web-dev-perf", "patterns-dev", "overreacted", "vitest-docs", "chrome-devtools"],
          },
        ],
      },
    ],
  },
  {
    slug: "backend",
    title: "Backend",
    tagline: "Data, APIs, and the machines that serve them.",
    summary:
      "Learn to build services that store truth, survive bad input, and can be operated by someone who is not you.",
    outcome:
      "Design and run a small service with a real database, auth boundaries, tests in CI, and a scaling story.",
    ranks: [
      {
        id: "spark",
        stages: [
          {
            id: "be-language",
            title: "A language that will carry you",
            summary:
              "Pick Python or JavaScript and learn it properly. A backend career starts as fluency, not as a framework logo.",
            skills: ["Python or Node", "Functions", "Tests", "Tooling"],
            milestone: "Solve a week of exercises and write a CLI that reads and writes files safely.",
            resources: ["python-tutorial", "py4e", "node-learn", "cs50-python", "exercism"],
          },
          {
            id: "be-http",
            title: "Requests, responses, contracts",
            summary:
              "HTTP is the contract. Build a tiny API and learn to inspect it until status codes feel ordinary.",
            skills: ["HTTP", "JSON", "REST", "API clients"],
            milestone: "Ship a small JSON API and document every route in a page another person can follow.",
            resources: ["mdn-http", "express-docs", "fastapi-docs", "hoppscotch", "jwt-intro"],
          },
        ],
      },
      {
        id: "apprentice",
        stages: [
          {
            id: "be-data",
            title: "Data that survives",
            summary:
              "Learn SQL before you learn an ORM. Then meet Redis and a document store so you know why you might refuse them.",
            skills: ["SQL", "Postgres", "Indexes", "Caching"],
            milestone: "Model a small domain in Postgres with constraints, and answer five queries without an ORM.",
            resources: ["sqlbolt", "postgresql-tutorial", "postgres-docs", "mongodb-manual", "redis-docs"],
          },
          {
            id: "be-service",
            title: "A service, not a script",
            summary:
              "Pick a real framework, add migrations, and run it in a container so it is no longer a file on your laptop.",
            skills: ["Frameworks", "Migrations", "Auth storage", "Docker"],
            milestone: "Deploy a service with a migration history and a README that starts it from zero.",
            resources: ["django-docs", "nestjs-docs", "prisma-docs", "supabase-docs", "docker-get-started"],
          },
        ],
      },
      {
        id: "knight",
        stages: [
          {
            id: "be-safety",
            title: "Edges and safety",
            summary:
              "Authentication, injection, and the twelve-factor habits. This is where hobby APIs become something you can trust.",
            skills: ["OWASP", "Auth", "GraphQL or REST design", "CI"],
            milestone: "Threat-model your service against the OWASP list and close the holes you actually have.",
            resources: ["owasp-top-10", "owasp-cheatsheets", "graphql-learn", "twelve-factor", "github-actions"],
          },
          {
            id: "be-second",
            title: "A second stack",
            summary:
              "Learn a second backend language far enough to read its code. Go, Rust, or Java will change how you see the first one.",
            skills: ["Go or Rust or Java", "Types", "Concurrency taste", "Frameworks"],
            milestone: "Rebuild one endpoint from your service in a second language.",
            resources: ["go-tour", "rust-book", "spring-guides", "gin-docs", "baeldung"],
          },
        ],
      },
      {
        id: "master",
        stages: [
          {
            id: "be-systems",
            title: "Systems, not features",
            summary:
              "Read about data systems and reliability until architecture reviews feel like a conversation you can join.",
            skills: ["System design", "Storage", "SLOs", "Tradeoffs"],
            milestone: "Write a design doc for a feature that includes failure, data growth, and what you will measure.",
            resources: ["system-design-primer", "ddia", "sre-book", "martin-fowler", "refactoring-guru"],
          },
          {
            id: "be-operate",
            title: "Operate the thing",
            summary:
              "Kubernetes, proxies, and cloud docs are reference material. Learn enough to deploy, observe, and roll back.",
            skills: ["Kubernetes", "Reverse proxies", "IaC", "Cloud"],
            milestone: "Run your service behind a proxy with health checks and a rollback you have actually used.",
            resources: [
              "kubernetes-basics",
              "nginx-docs",
              "terraform-docs",
              "aws-docs",
              "digitalocean-tutorials",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "mobile",
    title: "Mobile apps",
    tagline: "Software that lives in a pocket.",
    summary:
      "Start with Flutter, the path Maksym knows from the inside, and keep native Android, SwiftUI, and React Native in view so you can choose later.",
    outcome:
      "Ship a mobile app with real navigation, persisted data, tests, and a release story.",
    ranks: [
      {
        id: "spark",
        stages: [
          {
            id: "mo-feel",
            title: "How interfaces feel",
            summary:
              "Mobile is a thumb, a glance, and a platform's rules. Learn the design systems before you invent a control.",
            skills: ["Material", "Apple HIG", "Layout", "Touch"],
            milestone: "Redesign one screen you use daily as a paper sketch that follows a platform's guidance.",
            resources: ["material-3", "apple-hig", "figma", "cs50", "mdn-learn"],
          },
          {
            id: "mo-choose",
            title: "Choose a first platform",
            summary:
              "Flutter is the recommended first blade here. Look at Dart, and glance at Kotlin and Swift so the choice is informed.",
            skills: ["Flutter setup", "Dart", "Kotlin glance", "Swift glance"],
            milestone: "Run the official Flutter starter on a device or emulator and change something visible.",
            resources: ["flutter-learn", "dart-language", "kotlin-docs", "swift-docs", "yt-flutter"],
          },
        ],
      },
      {
        id: "apprentice",
        stages: [
          {
            id: "mo-flutter",
            title: "Flutter, properly",
            summary:
              "Widgets, layout, and state. Do the codelabs, then build a screen that is not in the codelab.",
            skills: ["Widgets", "Layout", "State", "Dart"],
            milestone: "Build a two-screen Flutter app with local state and a loading state.",
            resources: ["flutter-codelabs", "flutter-learn", "riverpod-docs", "dart-language", "yt-flutter"],
          },
          {
            id: "mo-shores",
            title: "See the other shores",
            summary:
              "React Native, Android, and SwiftUI exist so you can recognize them in a job description and in someone else's code.",
            skills: ["React Native", "Expo", "Compose", "SwiftUI"],
            milestone: "Complete one official tutorial on a second mobile stack and note what Flutter hid from you.",
            resources: ["react-native-docs", "expo-docs", "android-courses", "swiftui-tutorial", "kotlin-koans"],
          },
        ],
      },
      {
        id: "knight",
        stages: [
          {
            id: "mo-data",
            title: "State, navigation, data",
            summary:
              "A real app remembers, navigates, and talks to a backend. Pick a state approach and stick with it for one project.",
            skills: ["Riverpod or Bloc", "Navigation", "Firebase or Supabase", "Async UI"],
            milestone: "Persist user data through a backend and restore it after a cold start.",
            resources: ["bloc-docs", "riverpod-docs", "firebase-docs", "expo-docs", "supabase-docs"],
          },
          {
            id: "mo-quality",
            title: "Platform quality",
            summary:
              "Motion, typography, and platform conventions. This is the difference between a demo and an app people keep.",
            skills: ["Compose or Cupertino", "HIG", "Material", "Polish"],
            milestone: "Pass a self-review against the HIG or Material checklist and fix the obvious misses.",
            resources: ["compose-docs", "apple-hig", "material-3", "kodeco", "yt-android"],
          },
        ],
      },
      {
        id: "master",
        stages: [
          {
            id: "mo-ship",
            title: "Ship it",
            summary:
              "Tests, signing, and a pipeline. Shipping is a skill separate from building the screen.",
            skills: ["Widget tests", "CI", "Release", "Security basics"],
            milestone: "Run tests in CI and produce a release build you could hand to a tester.",
            resources: ["flutter-testing", "github-actions", "owasp-top-10", "firebase-docs", "android-kotlin"],
          },
          {
            id: "mo-architecture",
            title: "Architecture you can teach",
            summary:
              "Separate UI, state, and data so the next person can change one without fear. Then write the map down.",
            skills: ["Bloc or Riverpod", "Boundaries", "Design docs", "Refactoring"],
            milestone: "Document the architecture of your app on one page and refactor one messy screen to match it.",
            resources: ["bloc-docs", "refactoring-guru", "system-design-primer", "martin-fowler", "kodeco"],
          },
        ],
      },
    ],
  },
];
