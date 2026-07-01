/* Small line icons so the interests read as a clean, consistent list
   rather than a wall of stock photos. */
const ICONS = {
  flag: (
    <path d="M5 21V4m0 0h11l-2 3.5L16 11H5" />
  ),
  gauge: (
    <>
      <path d="M4 19a8 8 0 1 1 16 0" />
      <path d="M12 13l4-3" />
    </>
  ),
  car: (
    <>
      <path d="M4 12l1.6-4.2A2 2 0 0 1 7.5 6.5h9a2 2 0 0 1 1.9 1.3L20 12" />
      <rect x="3" y="12" width="18" height="5" rx="1.6" />
      <circle cx="7.5" cy="17.5" r="1.2" />
      <circle cx="16.5" cy="17.5" r="1.2" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v10" />
      <circle cx="6.5" cy="18" r="2.2" />
      <circle cx="16.5" cy="16" r="2.2" />
    </>
  ),
  wheel: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 9.6V4M9.9 13.4l-4.4 2.7M14.1 13.4l4.4 2.7" />
    </>
  ),
  chess: (
    <>
      <path d="M8 21h8" />
      <path d="M9 21c0-3 .8-4.5.8-6H14c0 1.5.8 3 .8 6" />
      <path d="M8 9h8l-.8 2.5H8.8L8 9z" />
      <path d="M8 9V6.5h1.6V8h1.6V6.5h1.6V8h1.6V6.5H16V9" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.1" />
    </>
  ),
};

export default function GalleryApp({ interests }) {
  return (
    <div className="app-hobbies">
      <header className="app-hobbies-head">
        <p className="app-hobbies-title">Interests</p>
        <p className="app-hobbies-sub">A few things I'm into away from a keyboard.</p>
      </header>

      <ul className="app-hobbies-grid">
        {interests.map((item) => (
          <li className="app-hobby" key={item.title}>
            <span className="app-hobby-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[item.icon] || ICONS.flag}
              </svg>
            </span>
            <span className="app-hobby-text">
              <span className="app-hobby-name">{item.title}</span>
              <span className="app-hobby-detail">{item.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
