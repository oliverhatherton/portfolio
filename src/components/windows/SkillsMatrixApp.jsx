import { useState } from "react";

export default function SkillsMatrixApp({ groups }) {
  const [idx, setIdx] = useState(0);
  const group = groups[idx];
  const go = (delta) => setIdx((i) => (i + delta + groups.length) % groups.length);

  return (
    <div className="app-slides">
      <div className="app-slides-toolbar">skills.pptx</div>
      <div className="app-slides-stage">
        <button
          type="button"
          className="app-slides-nav"
          aria-label="Previous slide"
          onClick={() => go(-1)}
        >
          ‹
        </button>

        <div className="app-slide">
          <p className="app-slide-title">{group.group}</p>
          <ul className="app-slide-list">
            {group.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="app-slides-nav"
          aria-label="Next slide"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>

      <div className="app-slides-foot">
        <div className="app-slides-dots">
          {groups.map((g, i) => (
            <button
              type="button"
              key={g.group}
              className={`app-slides-dot${i === idx ? " is-active" : ""}`}
              aria-label={`Go to ${g.group} slide`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
        <span className="app-slides-count">
          {idx + 1} / {groups.length}
        </span>
      </div>
    </div>
  );
}
