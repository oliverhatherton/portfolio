import "./hero.css";
import PageSection from "../pageSection";

export default function Hero({
  id = "hero",
  eyebrow = "Backend-Focused Software Engineer",
  titleLines = ["Oliver", "Atherton"],
  description = "Software Engineering (BSc) student at the University of Huddersfield, expecting a First Class degree, with a passion for backend development. Experience in building complex systems and APIs, gained from my year in industry placement at Babcock International.",
  location = "Huddersfield, UK",
  availability = "Seeking Graduate Backend Roles (Mid 2027 Start)",
  showScrollHint = true,
}) {
  return (
    <PageSection id={id} className="hero-section">
      <div className="hero-shell">
        <p className="hero-eyebrow">{eyebrow}</p>

        <h1 className="hero-title" aria-label={titleLines.join(" ")}>
          {titleLines.map((line) => (
            <span key={line} className="hero-title-line">
              {line}
            </span>
          ))}
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">{description}</p>

          <div className="hero-right" aria-label="Hero metadata">
            <p className="hero-pill">{location}</p>
            <p className="hero-pill hero-pill-available">
              <span className="hero-pill-dot" />
              {availability}
            </p>
          </div>
        </div>

        {showScrollHint ? (
          <div className="hero-scroll-hint" aria-hidden="true">
            <span className="hero-scroll-line" />
            <span className="hero-scroll-text">Scroll</span>
          </div>
        ) : null}
      </div>
    </PageSection>
  );
}
