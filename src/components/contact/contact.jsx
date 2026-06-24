import "./contact.css";
import PageSection from "../pageSection";
import SocialLinks from "../socialLinks";
import { profile } from "../../data/profile";

export default function Contact({
  id = "contact",
  label = "Get in touch",
  title = "Let's talk",
  copy = "I'm open to graduate backend roles from mid 2027. If you want to talk distributed systems or a hard backend problem, send me an email.",
  availability = "Available for Graduate Backend Roles",
}) {
  const year = new Date().getFullYear();

  return (
    <PageSection id={id} className="contact-section">
      <div className="contact-shell">
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="s-label">{label}</p>
            <h2 className="contact-title">{title}</h2>
            <p className="contact-lead">{copy}</p>

            <a className="contact-cta" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>

            <p className="contact-availability">
              <span className="contact-availability-dot" />
              {availability}
            </p>
          </div>

          <div className="contact-links">
            <SocialLinks variant="expanded" />
          </div>
        </div>

        <footer className="contact-footer">
          <span>© {year} {profile.name}</span>
          <span>Designed &amp; built in the UK</span>
        </footer>
      </div>
    </PageSection>
  );
}
