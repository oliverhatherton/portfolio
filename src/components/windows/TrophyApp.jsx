export default function TrophyApp({ achievements }) {
  return (
    <div className="app-trophy">
      <div className="app-trophy-bar">Achievements</div>
      <div className="app-trophy-grid">
        {achievements.map((a) => (
          <div className="app-trophy-card" key={a.title}>
            <p className="app-trophy-title">{a.title}</p>
            <p className="app-trophy-detail">{a.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
