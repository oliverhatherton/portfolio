export default function HeroPill({ className = "", children }) {
  const pillClassName = ["hero-pill", className].filter(Boolean).join(" ");

  return <p className={pillClassName}>{children}</p>;
}
