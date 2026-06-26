export const bioParagraphs = [
  "It started on a second-hand MacBook running Minecraft at about 45fps which got me hooked on how software worked. I the got my first coding book at ten and never really stopped. Computer Science at school, GCSE and A-Level Computer Science, and now a BSc in Software Engineering at the University of Huddersfield, on track for First-Class Honours. I didn't fall into this field; I kept choosing it.",
  "What pulled me in is the mix of art and engineering, there are always a dozen ways to solve a problem, and finding the elegant one is the fun part. I care most about understanding things properly: how a system behaves under load, why a design decision was made, what happens when the network drops a packet. Surface-level knowledge has never sat well with me.",
  "I joined Babcock International in Bristol as a Year in Industry Software Engineer, and it's where I found my love for backend work. My first project was a monitoring and configuration platform for specialist hardware, handed to me a codebase using Rust, Tokio and Tauri. Having never written a line of Rust, a couple of months of deliberate daily learning later I was shipping features and fixing defects in it. My second project moved me onto command-and-control software for radio equipment in Java and Vue, where I've since been contributing effectively completing 11 tickets comprised of user stories, tech debt and bugs just over 3 months.",
  "Outside of work I build things to understand them properly. Currently I'm working on my Order Lifecycle Application, currently I'm working on just the backend which is NestJS reference backend that models an order's full life as an event-driven workflow over RabbitMQ: idempotent consumers, dead-letter queues, the dual-write problem, recovery from partial failure. It's less a product and more a worked example of the patterns a real distributed system needs.",
  "Away from a keyboard I'm a McLaren F1 die-hard, lights out on a Sunday and you won't get much out of me. I'm also into motorsport more broadly (WEC, IMSA, GTWC), a bit of sim racing and gaming, and there's pretty much always music on while I build. I'm looking for a graduate backend role from mid-2027, somewhere I can take on difficult problems and be trusted to either know the answer or go and find it.",
];

export const experience = [
  {
    title: "Babcock International",
    subtitle:
      "Year in Industry Software Engineer · Bristol - monitoring & configuration platform (Rust, Tokio, Tauri), then command & control software for radio equipment (Java, Vue)",
    meta: "2025 - 26",
  },
  {
    title: "Babcock Internal Hackathon",
    subtitle:
      "Backend Lead, 3 months into placement · convoy management platform - finished runner-up, one team member short of every other team",
    meta: "2025",
  },
  {
    title: "University of Huddersfield",
    subtitle:
      "BSc (Hons) Software Engineering · on track for a First - 91% Operating Systems, 81% Software Design & Development, 79% Computer Architecture",
    meta: "2023 - 27",
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
      "Auth & authorization",
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
    { name: "Software Design & Development", mark: "81%" },
    { name: "Computer Organisation & Architecture", mark: "79%" },
    { name: "Computer Networks", mark: "76%" },
    { name: "Object-Oriented Systems Development", mark: "73%" },
    { name: "Artificial Intelligence", mark: "71%" },
    { name: "Relational Databases", mark: "70%" },
  ],
  note: "Also a podium finish at Huddersfield's internal hackathon.",
};

export const achievements = [
  {
    title: "rapid technology adoption",
    detail:
      "Went from zero Rust experience to shipping production code in Rust, Tokio and Tauri on my first project. By my second, on Java and Vue, I was contributing to a new sprint completely unassisted within 3 days of joining.",
  },
  {
    title: "technical debt refactor",
    detail:
      "Led a refactor that consolidated 16 duplicated endpoints into 8 reusable ones: found the duplication, designed the consolidated solution, repaired the integration and unit tests it broke, and made the surface area easier to maintain.",
  },
  {
    title: "hackathon leadership",
    detail:
      "Led backend development at a Babcock internal hackathon just three months into placement. Our team was one team member short of every other team, and we had a teammate who'd started coding only three months earlier who required pair programming to be able to contribute. Finished runner-up.",
  },
];

export const interests = [
  "Formula 1 - McLaren, papaya through and through",
  "Motorsport more broadly: WEC, WRC, IMSA, GT World Challenge",
  "Cars and automotive engineering",
  "Music - there's pretty much always something playing while I build",
  "Go-karting",
  "Chess",
  "GeoGuessr",
  "Competitive gaming",
];

export const values = ["curiosity", "integrity", "ownership", "growth", "family", "stability"];

export const currently = {
  workingOn: ["Order Lifecycle Application"],
  learning: ["System design through building the Order Lifecycle Application"],
  // "watching" is computed live in the terminal component from the F1 API.
  lookingFor: ["graduate backend opportunities (2027)"],
};

export const projects = [
  {
    name: "order-lifecycle-backend",
    tagline: "A production-shaped backend exploring the hard parts of distributed systems.",
    flow: "placed → reserved → paid → completed / failed",
    focus: [
      "Event-driven workflows over RabbitMQ",
      "Idempotent consumers",
      "Dead-letter queues",
      "Failure recovery",
      "Refresh-token rotation",
      "Role-based access control",
      "Real infrastructure testing with Testcontainers",
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL", "RabbitMQ", "JWT", "Docker", "Testcontainers"],
    roadmap: [
      { label: "Identity & Access", status: "done" },
      { label: "Order Core Domain", status: "done" },
      { label: "Event-Driven Fulfilment", status: "progress" },
      { label: "Redis Caching", status: "planned" },
      { label: "Observability & Tracing", status: "planned" },
    ],
  },
];
