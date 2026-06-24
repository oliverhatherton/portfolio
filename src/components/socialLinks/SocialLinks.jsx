import "./socialLinks.css";
import Icon from "../icon";
import { socials } from "../../data/profile";

export default function SocialLinks({ variant = "compact", className = "" }) {
  const rootClassName = ["social-links", `social-links-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={rootClassName} aria-label="Social and contact links">
      {socials.map((social) => (
        <li key={social.label}>
          <a
            className="social-link"
            href={social.href}
            target={social.icon === "mail" ? undefined : "_blank"}
            rel={social.icon === "mail" ? undefined : "noopener noreferrer"}
          >
            <Icon name={social.icon} size={variant === "expanded" ? 18 : 16} />
            {variant === "expanded" ? (
              <span className="social-link-text">
                <span className="social-link-label">{social.label}</span>
                <span className="social-link-handle">{social.handle}</span>
              </span>
            ) : (
              <span className="sr-only">{social.label}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
