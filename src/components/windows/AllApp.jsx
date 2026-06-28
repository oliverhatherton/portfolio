import useNextRace from "../../hooks/useNextRace";

export default function AllApp({ data }) {
  const raceLabel = useNextRace();
  const {
    bioParagraphs,
    values,
    experience,
    achievements,
    grades,
    skills,
    projects,
    currently,
    interests,
    contact,
  } = data;

  return (
    <div className="app-all">
      <div className="app-preview-page">
        <header className="app-all-hero">
          <p className="app-all-kicker">Portfolio overview</p>
          <h1>Oliver Atherton</h1>
          <p>Backend-focused software engineer building reliable systems, APIs, and distributed services.</p>
        </header>

        <main className="app-all-body">
          <section className="app-all-section">
            <h2>About</h2>
            {bioParagraphs.map((p, i) => (
              <p className="app-all-p" key={i}>
                {p}
              </p>
            ))}
            <div className="app-all-tags">
              {values.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </section>

          <section className="app-all-section">
            <h2>Experience</h2>
            {experience.map((item) => (
              <div className="app-all-item" key={item.title + item.meta}>
                <p className="app-all-item-title">
                  {item.title} <span>{item.meta}</span>
                </p>
                <p className="app-all-muted">{item.subtitle}</p>
              </div>
            ))}
          </section>

          <section className="app-all-section">
            <h2>Projects</h2>
            {projects.map((project) => (
              <div className="app-all-project" key={project.name}>
                <div className="app-all-item">
                  <p className="app-all-item-title">{project.title}</p>
                  <p className="app-all-muted">{project.tagline}</p>
                  {project.flow ? <p className="app-all-flow">{project.flow}</p> : null}
                </div>
                <div className="app-all-tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="app-all-section">
            <h2>Skills</h2>
            {skills.map((g) => (
              <div className="app-all-skill" key={g.group}>
                <p>{g.group}</p>
                <div className="app-all-tags">
                  {g.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="app-all-section">
            <h2>Achievements</h2>
            {achievements.map((a) => (
              <div className="app-all-item" key={a.title}>
                <p className="app-all-item-title">{a.title}</p>
                <p className="app-all-muted">{a.detail}</p>
              </div>
            ))}
          </section>

          <section className="app-all-section">
            <h2>Grades</h2>
            <p className="app-all-p">{grades.classification}</p>
            <div className="app-all-table">
              {grades.modules.map((m) => (
                <div className="app-all-row" key={m.name}>
                  <span>{m.name}</span>
                  <strong>{m.mark}</strong>
                </div>
              ))}
            </div>
            <p className="app-all-muted">{grades.note}</p>
          </section>

          <section className="app-all-section">
            <h2>Currently</h2>
            <p className="app-all-p">
              Working on {currently.workingOn.join(", ")}. Learning{" "}
              {currently.learning.join(", ")}. Watching {raceLabel}. Looking for{" "}
              {currently.lookingFor.join(", ")}.
            </p>
          </section>

          <section className="app-all-section">
            <h2>Interests</h2>
            {interests.map((item) => (
              <div className="app-all-item" key={item.title}>
                <p className="app-all-item-title">{item.title}</p>
                <p className="app-all-muted">{item.detail}</p>
              </div>
            ))}
          </section>

          <section className="app-all-section">
            <h2>Contact</h2>
            <p className="app-all-p">{contact.copy}</p>
            <p className="app-all-muted">
              {contact.email} · {contact.socials.map((s) => s.handle).join(" · ")}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
