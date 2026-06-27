const ROADMAP_MARK = { done: "✓", progress: "in progress", planned: "planned" };

export default function BlogApp({ project }) {
  const title = project.name
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="app-blog">
      <div className="app-blog-bar">
        <span className="app-blog-url">oliverhatherton.dev/blog/{project.name}</span>
      </div>
      <article className="app-blog-article">
        <p className="app-blog-tag">Engineering</p>
        <h1 className="app-blog-title">{title}</h1>
        <p className="app-blog-byline">Oliver Atherton · Backend</p>

        <p className="app-blog-p">{project.tagline}</p>
        <p className="app-blog-flow">{project.flow}</p>

        <h2 className="app-blog-h2">What it tackles</h2>
        <ul className="app-blog-list">
          {project.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2 className="app-blog-h2">Stack</h2>
        <div className="app-blog-tags">
          {project.stack.map((s) => (
            <span className="app-blog-pill" key={s}>
              {s}
            </span>
          ))}
        </div>

        <h2 className="app-blog-h2">Roadmap</h2>
        <ul className="app-blog-roadmap">
          {project.roadmap.map((r) => (
            <li key={r.label} className={`is-${r.status}`}>
              <span className="app-blog-mark">
                {r.status === "done" ? ROADMAP_MARK.done : ""}
              </span>
              {r.label}
              {r.status !== "done" ? (
                <span className="app-blog-status"> — {ROADMAP_MARK[r.status]}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
