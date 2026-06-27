import { useCallback, useState } from "react";

const DESKTOP_QUERY = "(min-width: 860px)";

/* Manages a single floating, draggable "app" window that sits on top of the
   terminal, only one open at a time, opening a new one replaces whatever
   was there. Disabled below the desktop breakpoint, `open` returns false
   there so callers can fall back to inline rendering instead. */
export default function useWindowManager() {
  const [win, setWin] = useState(null);

  const isDesktop = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.(DESKTOP_QUERY).matches,
    [],
  );

  const open = useCallback(
    (id, { title, app, props, width = 460, height = 540 } = {}) => {
      if (!isDesktop()) return false;

      setWin((prev) => {
        if (prev?.id === id) return prev; // already showing, leave it where it is
        return { id, title, app, props, width, height, x: 110, y: 80 };
      });
      return true;
    },
    [isDesktop],
  );

  const close = useCallback(() => setWin(null), []);

  const move = useCallback((id, x, y) => {
    setWin((prev) => (prev && prev.id === id ? { ...prev, x, y } : prev));
  }, []);

  // Only one window can ever be open, so there's nothing to raise above
  // anything else, but Window still calls onFocus on pointerdown.
  const focus = useCallback(() => {}, []);

  const windows = win ? [{ ...win, z: 1 }] : [];

  return { windows, open, close, move, focus };
}
