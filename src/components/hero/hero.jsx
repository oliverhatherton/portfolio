import "./hero.css";
import PageSection from "../pageSection";
import HeroPill from "./heroPill";
import HeroScrollHint from "./heroScrollHint";
import HeroTitle from "./heroTitle";

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

        <HeroTitle lines={titleLines} />

        <div className="hero-bottom">
          <p className="hero-desc">{description}</p>

          <div className="hero-right" aria-label="Hero metadata">
            <HeroPill>{location}</HeroPill>
            <HeroPill className="hero-pill-available">
              <span className="hero-pill-dot" />
              {availability}
            </HeroPill>
          </div>
        </div>

        {showScrollHint ? <HeroScrollHint /> : null}
      </div>
    </PageSection>
  );
}
