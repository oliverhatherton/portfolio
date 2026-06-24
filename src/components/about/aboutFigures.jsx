export default function AboutFigures({ figures }) {
  return (
    <dl className="about-figures" aria-label="Highlights by the numbers">
      {figures.map((figure) => (
        <div
          className={
            "about-figure" + (figure.featured ? " about-figure-feature" : "")
          }
          key={figure.value + figure.label}
        >
          <dt className="about-figure-value">{figure.value}</dt>
          <dd className="about-figure-label">{figure.label}</dd>
        </div>
      ))}
    </dl>
  );
}
