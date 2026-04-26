import "./projects.css";
import PageSection from "../pageSection";

const defaultProjects = [
  {
    title: "Task Queue",
    description:
      "A real-time task queue built with Vue, Express, and Redis, exploring messaging patterns, concurrent processing, and system behaviour under load. Designed to reflect production-style architecture with a focus on performance and observability.",
    meta: "Live",
    href: "https://task-queue.oliverhatherton.com",
  },
];

export default function Projects({
  id = "projects",
  label = "Selected work",
  title = "Projects",
  projects = defaultProjects,
}) {
  return (
    <PageSection id={id} className="projects-section">
      <div className="projects-shell">
        <header className="projects-header">
          <div>
            <p className="projects-label">{label}</p>
            <h2 className="projects-title">{title}</h2>
          </div>
          <p className="projects-note">
            A selection of projects exploring distributed systems, messaging
            patterns, and real-time application design. Each build focuses on
            performance, scalability, and production-style architecture.
          </p>
        </header>

        <ul className="projects-list" aria-label="Projects">
          {projects.map((project) => {
            const cardContent = (
              <>
                <div className="projects-card-top">
                  <span className="projects-card-title">{project.title}</span>
                  <span className="projects-card-meta">{project.meta}</span>
                </div>
                <p className="projects-card-copy">{project.description}</p>
                <span className="projects-card-link">
                  {project.href ? "Visit project" : "Coming soon"}
                </span>
              </>
            );

            return (
              <li className="projects-item" key={project.title}>
                {project.href ? (
                  <a className="projects-card" href={project.href}>
                    {cardContent}
                  </a>
                ) : (
                  <div className="projects-card">{cardContent}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </PageSection>
  );
}
