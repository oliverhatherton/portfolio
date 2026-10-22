export default function TranscriptApp({ classification, years, note }) {
  return (
    <div className="app-doc">
      <div className="app-doc-toolbar">Grades</div>
      <div className="app-doc-page">
        <h1 className="app-doc-h1">Academic Transcript</h1>
        <p className="app-doc-sub">{classification}</p>
        <table className="app-doc-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Mark</th>
            </tr>
          </thead>
          {years.map((year) => (
            <tbody key={year.label}>
              <tr className="app-doc-year">
                <th colSpan={2}>
                  {year.label} <span>{year.session}</span>
                </th>
              </tr>
              {year.modules.map((m) => (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  <td>{m.mark}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        <p className="app-doc-footnote">{note}</p>
      </div>
    </div>
  );
}
