import "./about.css";
import PageSection from "../pageSection";
import AboutBio from "./aboutBio";
import AboutListSection from "./aboutListSection";
import AboutSkillsSection from "./aboutSkillsSection";
import { bioParagraphs, experience, highlights, skills } from "./aboutData";

export default function About({
  id = "about",
  label = "My background",
  title = "About",
  cvHref = "//TODO: add cv link",
}) {
  return (
    <PageSection id={id} className="about-section">
      <div className="about-shell">
        <header className="about-header s-header">
          <div>
            <p className="s-label">{label}</p>
            <h2 className="s-title">{title}</h2>
          </div>
        </header>

        <div className="about-grid">
          <AboutBio paragraphs={bioParagraphs} cvHref={cvHref} />

          <aside className="about-side" aria-label="About highlights">
            <AboutListSection heading="Experience" items={experience} />
            <AboutListSection heading="Highlights" items={highlights} />
            <AboutSkillsSection skills={skills} />
          </aside>
        </div>
      </div>
    </PageSection>
  );
}
