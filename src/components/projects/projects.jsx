import "./projects.css";
import PageSection from "../pageSection";
import Icon from "../icon";

const defaultProjects = [];

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
            Things I've built to dig into distributed systems and messaging.
            Each one chases real throughput and production-style architecture.
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="projects-note">No projects to show.</p>
        ) : (
          <ul className="projects-list" aria-label="Projects">
            {projects.map((project) => {
              const cardContent = (
                <>
                  <div className="projects-card-top">
                    <span className="projects-card-title">{project.title}</span>
                    <span className="projects-card-meta">
                      {project.href ? (
                        <span className="projects-card-status" />
                      ) : null}
                      {project.meta}
                    </span>
                  </div>
                  <p className="projects-card-copy">{project.description}</p>
                  {project.tech?.length ? (
                    <ul className="projects-card-tech" aria-label="Tech stack">
                      {project.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="projects-card-link">
                    {project.href ? "Visit project" : "Coming soon"}
                    {project.href ? <Icon name="arrow" size={11} /> : null}
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
        )}
      </div>
    </PageSection>
  );
}
