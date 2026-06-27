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
    project,
    currently,
    interests,
    contact,
  } = data;

  return (
    <div className="app-doc">
      <div className="app-doc-toolbar">portfolio.pdf</div>
      <div className="app-doc-page">
        <h1 className="app-doc-h1">Oliver Atherton</h1>
        <p className="app-doc-sub">Backend-focused software engineer</p>

        <h2 className="app-doc-h2">About</h2>
        {bioParagraphs.map((p, i) => (
          <p className="app-doc-p" key={i}>
            {p}
          </p>
        ))}
        <p className="app-doc-meta">Values: {values.join(", ")}</p>

        <h2 className="app-doc-h2">Experience</h2>
        {experience.map((item) => (
          <div className="app-doc-item" key={item.title + item.meta}>
            <p className="app-doc-item-h">
              {item.title} · {item.meta}
            </p>
            <p className="app-doc-item-d">{item.subtitle}</p>
          </div>
        ))}

        <h2 className="app-doc-h2">Achievements</h2>
        {achievements.map((a) => (
          <div className="app-doc-item" key={a.title}>
            <p className="app-doc-item-h">{a.title}</p>
            <p className="app-doc-item-d">{a.detail}</p>
          </div>
        ))}

        <h2 className="app-doc-h2">Grades</h2>
        <p className="app-doc-p">{grades.classification}</p>
        <table className="app-doc-table">
          <tbody>
            {grades.modules.map((m) => (
              <tr key={m.name}>
                <td>{m.name}</td>
                <td>{m.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="app-doc-meta">{grades.note}</p>

        <h2 className="app-doc-h2">Skills</h2>
        {skills.map((g) => (
          <p className="app-doc-p" key={g.group}>
            <strong>{g.group}:</strong> {g.items.join(", ")}
          </p>
        ))}

        <h2 className="app-doc-h2">Projects</h2>
        <p className="app-doc-item-h">{project.name}</p>
        <p className="app-doc-item-d">{project.tagline}</p>
        <p className="app-doc-meta">Stack: {project.stack.join(", ")}</p>

        <h2 className="app-doc-h2">Currently</h2>
        <p className="app-doc-p">
          Working on {currently.workingOn.join(", ")}. Learning{" "}
          {currently.learning.join(", ")}. Watching {raceLabel}. Looking for{" "}
          {currently.lookingFor.join(", ")}.
        </p>

        <h2 className="app-doc-h2">Interests</h2>
        <p className="app-doc-p">{interests.join(" · ")}</p>

        <h2 className="app-doc-h2">Contact</h2>
        <p className="app-doc-p">{contact.copy}</p>
        <p className="app-doc-meta">
          {contact.email} · {contact.socials.map((s) => s.handle).join(" · ")}
        </p>
      </div>
    </div>
  );
}
