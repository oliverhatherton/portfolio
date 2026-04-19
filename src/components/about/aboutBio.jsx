function AboutBioParagraph({ lead, body }) {
  return (
    <p>
      <span className="about-emphasis">{lead}</span> {body}
    </p>
  );
}

export default function AboutBio({ paragraphs, cvHref }) {
  return (
    <div className="about-bio">
      {paragraphs.map((paragraph) => (
        <AboutBioParagraph
          key={paragraph.lead}
          lead={paragraph.lead}
          body={paragraph.body}
        />
      ))}

      <a href={cvHref} target="_blank" rel="noopener" className="cv-btn">
        <span>View CV</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 12L12 2M12 2H4M12 2V10" />
        </svg>
      </a>
    </div>
  );
}
