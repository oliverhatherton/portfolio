import { useCallback, useRef } from "react";
import "./windows.css";

export default function Window({
  id,
  title,
  x,
  y,
  z,
  width,
  height,
  onClose,
  onMove,
  onFocus,
  children,
}) {
  const dragState = useRef(null);

  const onPointerDown = useCallback(
    (e) => {
      onFocus(id);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: x,
        originY: y,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [id, onFocus, x, y],
  );

  const onPointerMove = useCallback(
    (e) => {
      const drag = dragState.current;
      if (!drag) return;
      const nx = drag.originX + (e.clientX - drag.startX);
      const ny = drag.originY + (e.clientY - drag.startY);
      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - 40;
      onMove(id, Math.min(Math.max(nx, -40), maxX), Math.min(Math.max(ny, 0), maxY));
    },
    [id, onMove],
  );

  const onPointerUp = useCallback(() => {
    dragState.current = null;
  }, []);

  return (
    <div
      className="app-window"
      style={{ left: x, top: y, zIndex: z, width, height }}
      onMouseDown={() => onFocus(id)}
      role="dialog"
      aria-label={title}
    >
      <header
        className="app-window-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <button
          type="button"
          className="app-window-close"
          aria-label={`Close ${title}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onClose(id)}
        />
        <span className="app-window-title">{title}</span>
      </header>
      <div className="app-window-body">{children}</div>
    </div>
  );
}
