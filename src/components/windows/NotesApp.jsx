export default function NotesApp({ paragraphs }) {
  return (
    <div className="app-notes">
      <div className="app-notes-bar">about.txt</div>
      <div className="app-notes-page">
        {paragraphs.map((p, i) => (
          <p className="app-notes-p" key={i}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
