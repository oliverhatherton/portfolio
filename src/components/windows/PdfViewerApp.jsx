import { useEffect, useRef, useState } from "react";

/* Render the PDF with PDF.js (canvas) rather than an <iframe>/<object>, so it
   shows regardless of the browser's "download PDFs" setting or plugin support. */
const PDFJS = "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.min.mjs";
const PDFJS_WORKER = "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";

export default function PdfViewerApp({ href, title }) {
  const docRef = useRef(null);
  const [state, setState] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await import(/* @vite-ignore */ PDFJS);
        pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;

        const pdf = await pdfjs.getDocument(href).promise;
        if (cancelled) return;

        const container = docRef.current;
        if (!container) return;
        container.innerHTML = "";

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cssWidth = container.clientWidth || 500;

        for (let n = 1; n <= pdf.numPages; n += 1) {
          const page = await pdf.getPage(n);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (cssWidth / base.width) * dpr });

          const canvas = document.createElement("canvas");
          canvas.className = "app-pdf-page";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          container.appendChild(canvas);

          await page.render({
            canvasContext: canvas.getContext("2d"),
            viewport,
          }).promise;
        }

        if (!cancelled) setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [href]);

  return (
    <div className="app-pdf">
      <div className="app-pdf-toolbar">
        <span className="app-pdf-name">{title}</span>
        <a className="app-pdf-open" href={href} target="_blank" rel="noopener noreferrer">
          open in new tab
        </a>
      </div>

      <div className="app-pdf-scroll">
        {state === "loading" ? (
          <p className="app-pdf-status">Loading {title}…</p>
        ) : null}
        {state === "error" ? (
          <p className="app-pdf-status">
            Couldn't render the preview.{" "}
            <a href={href} target="_blank" rel="noopener noreferrer">
              Open {title}
            </a>
          </p>
        ) : null}
        <div className="app-pdf-doc" ref={docRef} />
      </div>
    </div>
  );
}
