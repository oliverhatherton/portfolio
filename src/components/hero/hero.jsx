import "./hero.css";
import PageSection from "../pageSection";
import SocialLinks from "../socialLinks";
import HeroPill from "./heroPill";
import HeroScrollHint from "./heroScrollHint";
import HeroTitle from "./heroTitle";

export default function Hero({
  id = "hero",
  eyebrow = "Backend-Focused Software Engineer",
  titleLines = ["Oliver", "Atherton"],
  description = "Final-year Software Engineering student at Huddersfield, on track for a First Class degree. I build backend systems and APIs, and I spent my placement year at Babcock International shipping production software with an engineering team.",
  location = "Huddersfield, UK",
  availability = "Seeking Graduate Backend Roles · Mid 2027",
  showScrollHint = true,
}) {
  return (
    <PageSection id={id} className="hero-section">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            {eyebrow}
          </p>

          <HeroTitle lines={titleLines} />

          <p className="hero-desc">{description}</p>
        </div>

        <div className="hero-footer">
          <SocialLinks variant="compact" className="hero-socials" />

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
