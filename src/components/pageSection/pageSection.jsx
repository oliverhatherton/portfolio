import "./pageSection.css";

export default function PageSection({ id, className = "", children }) {
  const sectionClassName = ["page-section", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClassName}>
      {children}
    </section>
  );
}
