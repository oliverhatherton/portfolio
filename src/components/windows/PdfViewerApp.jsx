export default function PdfViewerApp({ href, title }) {
  return (
    <div className="app-pdf">
      <div className="app-pdf-toolbar">
        <span className="app-pdf-name">{title}</span>
        <a className="app-pdf-link" href={href} target="_blank" rel="noopener noreferrer">
          open in new tab ↗
        </a>
      </div>
      <object className="app-pdf-frame" data={`${href}#view=FitH`} type="application/pdf" aria-label={title}>
        <embed className="app-pdf-frame" src={`${href}#view=FitH`} type="application/pdf" />
        <p className="app-pdf-fallback">
          Your browser can't preview PDFs inline.{" "}
          <a href={href} target="_blank" rel="noopener noreferrer">
            Open {title} directly ↗
          </a>
        </p>
      </object>
    </div>
  );
}
