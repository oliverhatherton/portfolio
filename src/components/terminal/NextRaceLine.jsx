import useNextRace from "../../hooks/useNextRace";

export default function NextRaceLine() {
  const label = useNextRace();
  return <li className="t-line">→ {label}</li>;
}
