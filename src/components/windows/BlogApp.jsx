import { useState } from "react";

const ROADMAP_GLYPH = { done: "✓", progress: "◐", planned: "○" };
const ROADMAP_LABEL = { done: "Done", progress: "In progress", planned: "Planned" };

function PostFull({ post, onBack }) {
  return (
    <div className="app-blog">
      <div className="app-article-bar">
        <button type="button" className="app-article-back" onClick={onBack}>
          ← All posts
        </button>
      </div>

      <article className="app-article">
        <div className="app-article-meta">
          <span className="app-post-tag">{post.tag}</span>
          <span className="app-article-date">{post.date}</span>
        </div>
        <h1 className="app-article-title">{post.title}</h1>
        <p className="app-article-lead">{post.tagline}</p>

        {post.flow ? (
          <div className="app-article-flow">
            <span className="app-article-flow-label">Lifecycle</span>
            <code>{post.flow}</code>
          </div>
        ) : null}

        <h3 className="app-article-h">What it covers</h3>
        <ul className="app-article-list">
          {post.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h3 className="app-article-h">Stack</h3>
        <div className="app-article-pills">
          {post.stack.map((s) => (
            <span className="app-article-pill" key={s}>
              {s}
            </span>
          ))}
        </div>

        {post.roadmap ? (
          <>
            <h3 className="app-article-h">Roadmap</h3>
            <ul className="app-article-roadmap">
              {post.roadmap.map((r) => (
                <li key={r.label}>
                  <span className={`app-article-badge is-${r.status}`}>
                    {ROADMAP_GLYPH[r.status]}
                  </span>
                  <span className="app-article-rlabel">{r.label}</span>
                  <span className={`app-article-rstatus is-${r.status}`}>
                    {ROADMAP_LABEL[r.status]}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
    </div>
  );
}

export default function BlogApp({ posts }) {
  const [active, setActive] = useState(null);

  if (active) {
    return <PostFull post={active} onBack={() => setActive(null)} />;
  }

  return (
    <div className="app-blog">
      <header className="app-blog-masthead">
        <p className="app-blog-site">oliverhatherton.com / blog</p>
        <h1 className="app-blog-h1">Build notes</h1>
        <p className="app-blog-tagline">Things I'm building, and what I learn doing it.</p>
      </header>

      <div className="app-blog-list">
        {posts.map((post) => (
          <button
            type="button"
            className="app-blog-card"
            key={post.name}
            onClick={() => setActive(post)}
          >
            <div className="app-post-head">
              <span className="app-post-tag">{post.tag}</span>
              <span className="app-post-date">{post.date}</span>
            </div>
            <h2 className="app-post-title">{post.title}</h2>
            <p className="app-post-excerpt">{post.excerpt}</p>
            <span className="app-blog-readmore">Read post →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
