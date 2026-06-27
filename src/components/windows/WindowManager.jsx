import Window from "./Window";
import NotesApp from "./NotesApp";
import TimelineApp from "./TimelineApp";
import TranscriptApp from "./TranscriptApp";
import SkillsMatrixApp from "./SkillsMatrixApp";
import TrophyApp from "./TrophyApp";
import BlogApp from "./BlogApp";
import DashboardApp from "./DashboardApp";
import GalleryApp from "./GalleryApp";
import ContactCardApp from "./ContactCardApp";
import PdfViewerApp from "./PdfViewerApp";
import AllApp from "./AllApp";

const APPS = {
  notes: NotesApp,
  timeline: TimelineApp,
  transcript: TranscriptApp,
  skills: SkillsMatrixApp,
  trophy: TrophyApp,
  blog: BlogApp,
  dashboard: DashboardApp,
  gallery: GalleryApp,
  contact: ContactCardApp,
  pdf: PdfViewerApp,
  all: AllApp,
};

export default function WindowManager({ windows, onClose, onMove, onFocus }) {
  if (!windows.length) return null;

  return (
    <div className="app-window-layer">
      {windows.map((w) => {
        const App = APPS[w.app];
        return (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            x={w.x}
            y={w.y}
            z={w.z}
            width={w.width}
            height={w.height}
            onClose={onClose}
            onMove={onMove}
            onFocus={onFocus}
          >
            {App ? <App {...w.props} /> : null}
          </Window>
        );
      })}
    </div>
  );
}
