import { useCallback, useEffect, useRef, useState } from "react";
import "./terminal.css";
import { resolveSub, renderHelp, subNames } from "./commands.jsx";
import useWindowManager from "../../hooks/useWindowManager";
import WindowManager from "../windows/WindowManager";

const PROMPT = "~ %";
const HELP_WORDS = ["", "--help", "-h", "help", "?"];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  const idRef = useRef(0);
  const screenRef = useRef(null);
  const inputRef = useRef(null);
  const ranIntro = useRef(false);
  const tabRef = useRef({ matches: [], idx: -1 });
  // `run` and `clearScreen` call each other (retry buttons re-invoke `run`;
  // `run` triggers `clearScreen`). Refs break the circular declaration order
  // without relying on textual hoisting.
  const runRef = useRef(() => {});
  const clearScreenRef = useRef(() => {});

  const {
    windows,
    open: openWindow,
    close: closeWindow,
    move: moveWindow,
    focus: focusWindow,
  } = useWindowManager();

  const entry = useCallback(
    (node) => ({ id: idRef.current++, type: "output", node }),
    [],
  );

  const append = useCallback((entries) => {
    setLines((prev) => [...prev, ...entries]);
  }, []);

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim();
      setLines((prev) => [
        ...prev,
        { id: idRef.current++, type: "prompt", text: cmd },
      ]);
      if (!cmd) return;

      setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));

      const tokens = cmd.split(/\s+/);
      const bin = tokens[0].toLowerCase();
      const sub = (tokens[1] || "").toLowerCase();

      // `clear` works standalone too, like a real terminal.
      if (bin === "clear") {
        clearScreenRef.current();
        return;
      }

      // Everything else must be `portfolio <command>`.
      if (bin !== "portfolio") {
        const maybe = resolveSub(bin) ? bin : null;
        append([
          entry(
            <p className="t-line">
              command not found: {bin}.{" "}
              {maybe ? (
                <>
                  did you mean{" "}
                  <button
                    type="button"
                    className="t-cmd"
                    onClick={() => runRef.current(`portfolio ${maybe}`)}
                  >
                    portfolio {maybe}
                  </button>
                  ?
                </>
              ) : (
                <>
                  try{" "}
                  <button
                    type="button"
                    className="t-cmd"
                    onClick={() => runRef.current("portfolio --help")}
                  >
                    portfolio --help
                  </button>
                </>
              )}
            </p>,
          ),
        ]);
        return;
      }

      if (HELP_WORDS.includes(sub)) {
        append([entry(renderHelp({ run: runRef.current }))]);
        return;
      }

      if (sub === "clear") {
        clearScreenRef.current();
        return;
      }

      const def = resolveSub(sub);
      if (!def) {
        append([
          entry(
            <p className="t-line">
              unknown command:{" "}
              <span className="t-strong">portfolio {sub}</span>. try{" "}
              <button
                type="button"
                className="t-cmd"
                onClick={() => runRef.current("portfolio --help")}
              >
                portfolio --help
              </button>
            </p>,
          ),
        ]);
        return;
      }

      const node = def.run({ run: runRef.current, openWindow });
      if (node != null) append([entry(node)]);
    },
    [append, entry, openWindow],
  );
  useEffect(() => {
    runRef.current = run;
  });

  // `clear` resets the screen with a returning-user greeting + the help list.
  const clearScreen = useCallback(() => {
    setLines([entry(<WelcomeBack />), entry(renderHelp({ run: runRef.current }))]);
  }, [entry]);
  useEffect(() => {
    clearScreenRef.current = clearScreen;
  });

  useEffect(() => {
    if (ranIntro.current) return;
    ranIntro.current = true;
    append([entry(<Banner />)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    screenRef.current?.scrollTo({ top: screenRef.current.scrollHeight });
  }, [lines]);

  // Tab cycles through every match for the current fragment; pressing it
  // again (without typing) advances to the next one, wrapping around.
  const complete = () => {
    const raw = input.replace(/^\s+/, "");

    if (!raw.includes(" ")) {
      // Completing the first word: either "portfolio" or the standalone
      // "clear" command, cycling between them like the sub-level completion.
      const state = tabRef.current;
      const continuingCycle =
        state.matches.length > 0 && state.matches[state.idx] === raw;

      let matches = state.matches;
      let idx = state.idx;

      if (!continuingCycle) {
        matches = ["portfolio", "clear"].filter((n) =>
          n.startsWith(raw.toLowerCase()),
        );
        idx = 0;
      } else {
        idx = (idx + 1) % matches.length;
      }

      if (!matches.length) return;
      tabRef.current = { matches, idx };
      setInput(matches[idx] === "clear" ? "clear" : "portfolio ");
      return;
    }

    const [bin, ...rest] = raw.split(/\s+/);
    if (bin.toLowerCase() !== "portfolio") return;

    const subToken = rest[0] || "";
    const state = tabRef.current;
    const continuingCycle =
      state.matches.length > 0 && state.matches[state.idx] === subToken;

    let matches = state.matches;
    let idx = state.idx;

    if (!continuingCycle) {
      matches = subNames.filter((n) => n.startsWith(subToken.toLowerCase()));
      idx = 0;
    } else {
      idx = (idx + 1) % matches.length;
    }

    if (!matches.length) return;
    tabRef.current = { matches, idx };
    setInput(`portfolio ${matches[idx]}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHistIdx(-1);
      tabRef.current = { matches: [], idx: -1 };
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setInput(history[i]);
      tabRef.current = { matches: [], idx: -1 };
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const i = histIdx + 1;
      if (i >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(i);
        setInput(history[i]);
      }
      tabRef.current = { matches: [], idx: -1 };
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearScreen();
    }
  };

  return (
    <div className="terminal">
      <div className="t-window">
        <header className="t-titlebar">
          <span className="t-lights" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="t-titlebar-text">oliverhatherton - zsh</span>
        </header>

        <main
          className="t-screen"
          ref={screenRef}
          onClick={() => {
            // Don't steal focus right after a text selection focusing the input would otherwise collapse it, breaking copy.
            const selection = window.getSelection?.();
            if (selection && selection.toString().length > 0) return;
            inputRef.current?.focus();
          }}
        >
          <div className="t-output" aria-live="polite">
            {lines.map((line) =>
              line.type === "prompt" ? (
                <p className="t-echo" key={line.id}>
                  <span className="t-prompt">{PROMPT}</span> {line.text}
                </p>
              ) : (
                <div className="t-out" key={line.id}>
                  {line.node}
                </div>
              ),
            )}
          </div>

          <div className="t-input-row">
            <label className="t-prompt" htmlFor="terminal-input">
              {PROMPT}
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              className="t-input"
              value={input}
              onChange={(e) => {
                tabRef.current = { matches: [], idx: -1 };
                setInput(e.target.value);
              }}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              aria-label="Terminal command input"
              autoFocus
            />
          </div>
        </main>
      </div>

      <WindowManager
        windows={windows}
        onClose={closeWindow}
        onMove={moveWindow}
        onFocus={focusWindow}
      />
    </div>
  );
}

function Banner() {
  return (
    <div className="t-block">
      <p className="t-line">Oliver Atherton - backend-focused software engineer</p>
      <p className="t-line">
        try <span className="t-strong">portfolio --help</span> to start
        navigating
      </p>
    </div>
  );
}

function WelcomeBack() {
  return (
    <div className="t-block">
      <p className="t-line">Welcome back.</p>
      <p className="t-line t-dim">
        Screen's clear, <span className="t-strong">portfolio --help</span> if you need the list again.
      </p>
    </div>
  );
}
