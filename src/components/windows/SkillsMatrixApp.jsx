import { useState } from "react";

// One accent per slide so each category reads as its own slide.
const ACCENTS = ["#2563eb", "#16a34a", "#7c3aed", "#ea580c"];

export default function SkillsMatrixApp({ groups }) {
  const [idx, setIdx] = useState(0);
  const group = groups[idx];
  const accent = ACCENTS[idx % ACCENTS.length];
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

        <div className="app-slide" key={idx} style={{ "--accent": accent }}>
          <span className="app-slide-accent" aria-hidden="true" />
          <div className="app-slide-inner">
            <div className="app-slide-top">
              <span className="app-slide-kicker">Skills</span>
              <span className="app-slide-index">
                {String(idx + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}
              </span>
            </div>

            <h2 className="app-slide-title">{group.group}</h2>
            <span className="app-slide-rule" aria-hidden="true" />

            <div className="app-slide-chips">
              {group.items.map((item) => (
                <span className="app-slide-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <span className="app-slide-page" aria-hidden="true">
              {idx + 1}
            </span>
          </div>
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
              aria-label={`Go to ${g.group}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
        <span className="app-slides-count">{group.group}</span>
      </div>
    </div>
  );
}
