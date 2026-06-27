export default function ContactCardApp({ name, email, socials, copy }) {
  return (
    <div className="app-contact">
      <div className="app-contact-bar">Contacts</div>
      <div className="app-contact-card">
        <div className="app-contact-avatar" aria-hidden="true">
          {name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
        <p className="app-contact-name">{name}</p>
        <p className="app-contact-role">Backend Software Engineer</p>
        <p className="app-contact-copy">{copy}</p>
        <a className="app-contact-btn" href={`mailto:${email}`}>
          {email}
        </a>
        <div className="app-contact-links">
          {socials.map((s) => (
            <a
              key={s.label}
              className="app-contact-link"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label} <span>{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
