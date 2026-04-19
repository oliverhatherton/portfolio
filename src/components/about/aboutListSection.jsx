export default function AboutListSection({ heading, items }) {
  return (
    <div>
      <h3 className="detail-h">{heading}</h3>
      <ul className="about-list">
        {items.map((item) => (
          <li className="about-row" key={`${item.title}-${item.meta}`}>
            <div className="about-row-main">
              <span className="about-row-title">{item.title}</span>
              <span className="about-row-subtitle">{item.subtitle}</span>
            </div>
            <span className="about-row-meta">{item.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
