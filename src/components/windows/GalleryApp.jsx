const PALETTE = [
  "#1f3a2e",
  "#2e1f3a",
  "#3a2e1f",
  "#1f2e3a",
  "#3a1f2e",
  "#2e3a1f",
  "#1f3a3a",
  "#3a1f1f",
];

export default function GalleryApp({ interests }) {
  return (
    <div className="app-diary">
      <div className="app-diary-toolbar">diary</div>
      <div className="app-diary-grid">
        {interests.map((line, i) => (
          <div
            className="app-diary-poster"
            key={line}
            style={{ background: PALETTE[i % PALETTE.length] }}
          >
            <span className="app-diary-stars">★★★★★</span>
            <span className="app-diary-label">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
