import Icon from "../icon/Icon";

export default function AboutBio({ paragraphs, cvHref }) {
  return (
    <div className="about-bio">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      <a
        href={cvHref}
        target="_blank"
        rel="noopener noreferrer"
        className="cv-btn"
      >
        <span>View CV</span>
        <Icon name="arrow" size={12} />
      </a>
    </div>
  );
}
