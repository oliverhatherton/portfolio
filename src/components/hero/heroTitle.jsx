export default function HeroTitle({ lines, className = "" }) {
  const titleClassName = ["hero-title", className].filter(Boolean).join(" ");
  const ariaLabel = lines.join(" ");

  return (
    <h1 className={titleClassName} aria-label={ariaLabel}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="hero-title-line">
          {line}
        </span>
      ))}
    </h1>
  );
}
