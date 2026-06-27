import { useEffect, useState } from "react";

/* Live next-race lookup (Jolpica's Ergast-compatible F1 API). Falls back to
   a static label if the fetch fails. Shared by the inline "currently"
   output and the Dashboard app window. */
export default function useNextRace() {
  const [label, setLabel] = useState("Formula 1");

  useEffect(() => {
    let cancelled = false;

    fetch("https://api.jolpi.ca/ergast/f1/current/next.json")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const race = data?.MRData?.RaceTable?.Races?.[0];
        if (!race) return;

        const raceDate = new Date(`${race.date}T${race.time || "00:00:00Z"}`);
        const now = new Date();

        const isToday = raceDate.toDateString() === now.toDateString();

        // Monday-start week window containing "now".
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        const isThisWeek = raceDate >= startOfWeek && raceDate <= endOfWeek;

        if (isToday) {
          setLabel(`the ${race.raceName} today`);
        } else if (isThisWeek) {
          setLabel(`the ${race.raceName} on Sunday`);
        } else {
          setLabel("no F1 this week");
        }
      })
      .catch(() => {
        // keep the static fallback
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return label;
}
