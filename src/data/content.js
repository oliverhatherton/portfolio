export const bioParagraphs = [
  "It started on a second-hand MacBook running Minecraft at about 45fps, which got me hooked on how software actually worked. I got my first coding book at ten and never really stopped: IT and Computer Science at school through GCSE and A-Level, and now a BSc in Software Engineering at the University of Huddersfield, on track for First-Class Honours. I didn't fall into this field; I kept choosing it.",
  "What pulled me in is the mix of art and engineering. There are always a dozen ways to solve a problem, and finding the elegant one is the fun part. I care most about understanding things properly: how a system behaves under load, why a design decision was made, what happens when the network drops a packet. Surface-level knowledge has never sat well with me.",
  "I joined Babcock International in Bristol as a Year in Industry Software Engineer, and it's where I found my love for backend work. My first project was a monitoring and configuration platform for specialist hardware, handed to me as a Rust, Tokio and Tauri codebase. Having never written a line of Rust, a couple of months of deliberate daily learning later I was shipping features and fixing defects in it. My second project moved me onto command and control software for radio equipment in Java and Vue, where over my first three months I shipped 11 tickets spanning user stories, technical debt and bug fixes.",
  "Outside of work I build things to understand them properly. Right now that's the Order Lifecycle Application, a NestJS backend that models an order's full life as an event-driven workflow over RabbitMQ: idempotent consumers, dead-letter queues, the dual-write problem and recovery from partial failure. It's less a product and more a worked example of the patterns a real distributed system needs.",
  "Away from a keyboard I'm a McLaren F1 die-hard. Lights out on a Sunday and you won't get much out of me. I'm into motorsport more broadly (WEC, IMSA, GTWC), a bit of sim racing and gaming, and there's pretty much always music on while I build. I'm looking for a graduate backend role from mid-2027, somewhere I can take on difficult problems and be trusted to either know the answer or go and find it.",
];

export const experience = [
  {
    title: "Babcock International",
    subtitle:
      "Year in Industry Software Engineer, Bristol. Monitoring and configuration platform (Rust, Tokio, Tauri), then command and control software for radio equipment (Java, Vue).",
    meta: "2025 to 2026",
  },
  {
    title: "Babcock Internal Hackathon",
    subtitle:
      "Backend lead, three months into placement. Built a convoy management platform and finished runner-up, a team member short of every other team.",
    meta: "2025",
  },
  {
    title: "University of Huddersfield",
    subtitle:
      "BSc (Hons) Software Engineering, on track for a First. Top marks include 91% Operating Systems, 81% Software Design and Development, 79% Computer Architecture.",
    meta: "2023 to 2027",
  },
];

/* Only what I'm genuinely confident with. */
export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "Java", "JavaScript", "Python", "SQL"],
  },
  {
    group: "Backend",
    items: [
      "REST APIs",
      "NestJS",
      "PostgreSQL",
      "Auth and authorization",
      "RabbitMQ",
      "Spring Boot",
      "System design",
    ],
  },
  {
    group: "Frontend",
    items: ["React", "HTML", "Tailwind", "Vue"],
  },
  {
    group: "DevOps",
    items: ["Git", "Azure", "CI/CD", "Docker"],
  },
];

export const grades = {
  classification: "On track for First-Class Honours",
  modules: [
    { name: "Operating Systems", mark: "91%" },
    { name: "Software Design and Development", mark: "81%" },
    { name: "Computer Organisation and Architecture", mark: "79%" },
    { name: "Computer Networks", mark: "76%" },
    { name: "Object-Oriented Systems Development", mark: "73%" },
    { name: "Artificial Intelligence", mark: "71%" },
    { name: "Relational Databases", mark: "70%" },
  ],
  note: "Plus a podium finish at Huddersfield's internal hackathon.",
};

export const achievements = [
  {
    title: "Rapid technology adoption",
    detail:
      "Went from zero Rust experience to shipping production code in Rust, Tokio and Tauri on my first project. By my second, on Java and Vue, I was contributing to a new sprint completely unassisted within three days of joining.",
  },
  {
    title: "Technical debt refactor",
    detail:
      "Led a refactor that consolidated 16 duplicated endpoints into 8 reusable ones. I found the duplication, designed the consolidated solution, repaired the integration and unit tests it broke, and left the surface area easier to maintain.",
  },
  {
    title: "Hackathon leadership",
    detail:
      "Led backend development at a Babcock internal hackathon three months into placement. We were a team member short of every other team, and I pair-programmed with a teammate who had started coding only three months earlier so he could contribute. We finished runner-up.",
  },
];

export const interests = [
  {
    title: "Formula 1",
    detail: "McLaren, papaya through and through.",
    icon: "flag",
  },
  {
    title: "Motorsport",
    detail: "WEC, WRC, IMSA and GT World Challenge. I will watch anything with a grid.",
    icon: "gauge",
  },
  {
    title: "Cars",
    detail: "JDM at heart. The Lancer Evo VI Tommi Mäkinen Edition is the dream.",
    icon: "car",
  },
  {
    title: "Music",
    detail: "Pretty much always something playing while I build, Pink Floyd more than most.",
    icon: "music",
  },
  {
    title: "Go-karting",
    detail: "The closest most of us get to a real lights-out race start.",
    icon: "wheel",
  },
  {
    title: "Chess",
    detail: "Slow games, sharp endgames and the occasional honest blunder.",
    icon: "chess",
  },
  {
    title: "GeoGuessr",
    detail: "Dropped on a random street with one job: work out where on earth I am.",
    icon: "pin",
  },
];

export const values = ["curiosity", "integrity", "ownership", "growth", "family", "stability"];

export const currently = {
  workingOn: ["Order Lifecycle Application"],
  learning: ["System design, through building the Order Lifecycle Application"],
  // "watching" is computed live in the terminal component from the F1 API.
  lookingFor: ["Graduate backend opportunities (2027)"],
};

export const projects = [
  {
    name: "order-lifecycle-backend",
    title: "Order Lifecycle Application",
    tag: "Distributed systems",
    date: "2025",
    href: "https://order-lifecycle.oliverhatherton.com",
    excerpt:
      "A complete, production-shaped backend that models the full life of an order as an event-driven workflow.",
    tagline:
      "A production-shaped backend exploring the hard parts of distributed systems, built epic by epic and deployed.",
    flow: "PENDING → RESERVED → PAID → COMPLETED, or FAILED",
    focus: [
      "Event-driven fulfilment over RabbitMQ with order, inventory, payment, completion and email consumers",
      "Idempotent consumers via an inbox pattern, dead-letter queues and bounded retry",
      "JWT auth with rotating refresh tokens and role-based access control",
      "Redis cache-aside with explicit invalidation and fail-open on errors",
      "Prometheus metrics, correlation IDs and OpenTelemetry tracing across the broker",
      "Payment idempotency to close the double-charge window on redelivery",
      "Crash recovery proven end to end with Testcontainers against real Postgres and RabbitMQ",
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "Prometheus",
      "OpenTelemetry",
      "Docker",
    ],
    roadmap: [
      { label: "Identity and access", status: "done" },
      { label: "Order core domain (FSM)", status: "done" },
      { label: "Event-driven fulfilment", status: "done" },
      { label: "Performance and caching (Redis)", status: "done" },
      { label: "Observability (metrics, tracing)", status: "done" },
      { label: "Payment idempotency (stretch)", status: "done" },
    ],
  },
  {
    name: "interactive-portfolio",
    title: "This portfolio",
    tag: "Frontend",
    date: "2025",
    excerpt:
      "A portfolio built as a usable command line, where every section opens as its own little desktop app.",
    tagline:
      "The site you're reading now: a terminal you can actually type into, with draggable desktop apps for each section.",
    focus: [
      "Command parser with history and tab completion",
      "A draggable, single-instance window manager",
      "A distinct fake app for every section",
      "Live F1 schedule lookup for the currently page",
      "Graceful fallback to plain output on mobile",
    ],
    stack: ["React", "Vite", "Plain CSS"],
  },
];
