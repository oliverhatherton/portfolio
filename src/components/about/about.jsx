import "./about.css";
import PageSection from "../pageSection";
import AboutBio from "./aboutBio";
import AboutFigures from "./aboutFigures";
import AboutListSection from "./aboutListSection";
import AboutToolkit from "./aboutToolkit";
import { bioParagraphs, experience, figures, toolkit } from "./aboutData";
import { profile } from "../../data/profile";

export default function About({
  id = "about",
  label = "My background",
  title = "About",
  cvHref = profile.cvHref,
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

        <AboutFigures figures={figures} />

        <div className="about-grid">
          <AboutBio paragraphs={bioParagraphs} cvHref={cvHref} />

          <aside className="about-side" aria-label="About highlights">
            <AboutListSection heading="Experience" items={experience} />
            <AboutToolkit toolkit={toolkit} />
          </aside>
        </div>
      </div>
    </PageSection>
  );
}
