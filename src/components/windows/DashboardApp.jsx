import useNextRace from "../../hooks/useNextRace";

const SECTIONS = [
  { key: "workingOn", label: "Working on" },
  { key: "learning", label: "Learning" },
  { key: "lookingFor", label: "Looking for" },
];

export default function DashboardApp({ currently }) {
  const raceLabel = useNextRace();

  return (
    <div className="app-dash">
      <div className="app-dash-bar">Today</div>
      <div className="app-dash-grid">
        {SECTIONS.map((s) => (
          <div className="app-dash-card" key={s.key}>
            <p className="app-dash-card-h">{s.label}</p>
            {currently[s.key].map((item) => (
              <p className="app-dash-item" key={item}>
                {item}
              </p>
            ))}
          </div>
        ))}
        <div className="app-dash-card app-dash-card-wide">
          <p className="app-dash-card-h">Watching</p>
          <p className="app-dash-item">{raceLabel}</p>
        </div>
      </div>
    </div>
  );
}
