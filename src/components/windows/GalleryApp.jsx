export default function GalleryApp({ interests }) {
  return (
    <div className="app-mood">
      <header className="app-mood-head">
        <p className="app-mood-kicker">Interests</p>
        <p className="app-mood-sub">A few things I'm into away from a keyboard.</p>
      </header>

      <div className="app-mood-grid">
        {interests.map((item, i) => {
          const src =
            item.src || `https://loremflickr.com/640/440/${item.image}?lock=${i + 1}`;
          const contain = item.fit === "contain";
          return (
            <article className="app-mood-card" key={item.title}>
              <div className={`app-mood-photo${contain ? " is-contain" : ""}`}>
                <img
                  src={src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="app-mood-meta">
                <p className="app-mood-title">{item.title}</p>
                <p className="app-mood-detail">{item.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
