import useNextRace from "../../hooks/useNextRace";

const DATE_FORMAT = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const WEEKDAY_FORMAT = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const MONTH_FORMAT = new Intl.DateTimeFormat(undefined, { month: "short" });

function makeEvents(currently, raceLabel) {
  const events = [];

  currently.workingOn.forEach((item, i) => {
    events.push({
      time: i === 0 ? "09:00" : "10:00",
      label: "Work block",
      title: item,
      note: "Order domain, event flow, reliability work",
      tone: "blue",
      type: "event",
    });
  });

  currently.learning.forEach((item, i) => {
    events.push({
      time: i === 0 ? "11:30" : "12:30",
      label: "Study task",
      title: item,
      note: "Build, test, then write down the pattern",
      tone: "green",
      type: "task",
    });
  });

  events.push({
    time: "15:30",
    label: "Watching",
    title: raceLabel,
    note: "Motorsport slot",
    tone: "orange",
    type: "event",
  });

  currently.lookingFor.forEach((item, i) => {
    events.push({
      time: i === 0 ? "17:00" : "17:45",
      label: "Career task",
      title: item,
      note: "Backend, distributed systems, real ownership",
      tone: "purple",
      type: "task",
    });
  });

  return events;
}

export default function DashboardApp({ currently }) {
  const raceLabel = useNextRace();
  const today = new Date();
  const events = makeEvents(currently, raceLabel);

  return (
    <div className="app-cal">
      <header className="app-cal-top">
        <div>
          <p className="app-cal-product">Calendar</p>
          <h1 className="app-cal-title">{DATE_FORMAT.format(today)}</h1>
        </div>
        <span className="app-cal-today-pill">Today</span>
      </header>

      <div className="app-cal-day">
        <div className="app-cal-day-label">
          <span>{WEEKDAY_FORMAT.format(today)}</span>
          <strong>{today.getDate()}</strong>
          <em>{MONTH_FORMAT.format(today)}</em>
        </div>

        <div className="app-cal-agenda" aria-label="Today's schedule">
          {events.map((event) => (
            <article className="app-cal-row" key={`${event.time}-${event.title}`}>
              <time className="app-cal-time">{event.time}</time>
              <div className={`app-cal-event is-${event.tone}`}>
                <div className="app-cal-event-head">
                  <span className={`app-cal-marker is-${event.type}`} aria-hidden="true" />
                  <span className="app-cal-label">{event.label}</span>
                </div>
                <p className="app-cal-event-title">{event.title}</p>
                <p className="app-cal-event-note">{event.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
