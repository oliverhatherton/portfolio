export default function TimelineApp({ items }) {
  return (
    <div className="app-timeline">
      <div className="app-timeline-bar">Experience</div>
      <div className="app-timeline-body">
        <ol className="app-timeline-rail">
          {items.map((item) => (
            <li className="app-timeline-row" key={item.title + item.meta}>
              <span className="app-timeline-dot" aria-hidden="true" />
              <div className="app-timeline-content">
                <p className="app-timeline-meta">{item.meta}</p>
                <p className="app-timeline-title">{item.title}</p>
                <p className="app-timeline-sub">{item.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
