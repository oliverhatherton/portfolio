import { useCallback, useEffect, useRef, useState } from "react";
import "./terminal.css";
import { resolveSub, resolveName, renderHelp, subNames } from "./commands.jsx";
import { profile, socials } from "../../data/profile";
import useWindowManager from "../../hooks/useWindowManager";
import WindowManager from "../windows/WindowManager";

const PROMPT = "~ %";
const HELP_WORDS = ["", "--help", "-h", "help", "?"];
/* Sections offered as tappable commands (intro row on desktop, status bar
   on small screens), so nothing requires typing. */
const QUICK = ["about", "experience", "projects", "skills", "grades", "contact"];

// Touch devices: focusing the input pops the keyboard over the content, so
// only focus it when the visitor taps the prompt itself.
const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [active, setActive] = useState(null);

  const idRef = useRef(0);
  const screenRef = useRef(null);
  const inputRef = useRef(null);
  const ranIntro = useRef(false);
  // The intro is pre-run on load; only scroll once the visitor runs something.
  const userRan = useRef(false);
  const bannerShown = useRef(false);
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
      userRan.current = true;
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

      if (bin === "neofetch") {
        const first = !bannerShown.current;
        bannerShown.current = true;
        append([entry(<Banner run={runRef.current} first={first} />)]);
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

      setActive(resolveName(sub));
      const node = def.run({ run: runRef.current, openWindow });
      if (node != null) append([entry(node)]);
    },
    [append, entry, openWindow],
  );
  useEffect(() => {
    runRef.current = run;
  });

  // `clear` empties the screen, leaving just the prompt, like a real terminal.
  const clearScreen = useCallback(() => {
    setActive(null);
    setLines([]);
  }, []);
  useEffect(() => {
    clearScreenRef.current = clearScreen;
  });

  useEffect(() => {
    if (ranIntro.current) return;
    ranIntro.current = true;
    // Type `neofetch` into the prompt and run it, like a real session.
    // No cleanup: StrictMode's remount would cancel it and the ref stops a rerun.
    const cmd = "neofetch";
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const step = reduced ? 0 : 45;
    for (let i = 1; i <= cmd.length; i += 1) {
      setTimeout(() => setInput(cmd.slice(0, i)), 250 + step * i);
    }
    setTimeout(() => {
      runRef.current(cmd);
      setInput("");
    }, 250 + step * (cmd.length + 3));
  }, []);

  // Bring the latest command to the top of the screen so its output reads
  // from the start; short output simply leaves the prompt in view.
  useEffect(() => {
    const screen = screenRef.current;
    const echoes = screen?.querySelectorAll(".t-echo");
    const last = echoes?.[echoes.length - 1];
    if (!last || !userRan.current) return;
    screen.scrollTo({ top: last.offsetTop - 16 });
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
      <div className="t-window" data-ui>
        <header className="t-titlebar">
          <span className="t-lights" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="t-titlebar-text">oliverhatherton - zsh</span>
        </header>

        <main
          className="t-screen"
          ref={screenRef}
          onClick={(e) => {
            if (isTouch() || e.target.closest("a, button")) return;
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
              autoFocus={!isTouch()}
            />
          </div>
        </main>

        {/* Shown below the desktop breakpoint only, where there are no windows. */}
        <nav className="t-statusbar" aria-label="Portfolio sections">
          <span className="t-status-session" aria-hidden="true">[portfolio]</span>
          {[...QUICK, "cv"].map((name) => (
            <button
              type="button"
              key={name}
              className="t-status-cmd"
              aria-current={active === name ? "true" : undefined}
              onClick={() => run(`portfolio ${name}`)}
            >
              {name}
            </button>
          ))}
        </nav>
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

/* neofetch-style summary: the recruiter's first questions, answered as CLI output. */
function Banner({ run, first = false }) {
  // Only the first intro is the page's h1, and only it carries the hint.
  const Title = first ? "h1" : "p";
  const rows = [
    ["role", "backend software engineer"],
    ["status", "open to graduate roles from mid\u20112027"],
    ["degree", "BSc Software Engineering, Huddersfield (on track for a First)"],
    ["industry", "year in industry at Babcock International (Rust, Java)"],
  ];

  return (
    <div className="t-fetch">
      <Title className="t-fetch-title" style={{ "--i": 0 }}>
        {profile.name}
      </Title>
      <p className="t-fetch-rule" aria-hidden="true" style={{ "--i": 1 }}>
        {"-".repeat(profile.name.length)}
      </p>
      <dl className="t-fetch-rows">
        {rows.map(([key, value], i) => (
          <div className="t-fetch-row" key={key} style={{ "--i": i + 2 }}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div className="t-fetch-row t-fetch-sections" style={{ "--i": 6 }}>
          <dt>sections</dt>
          <dd className="t-fetch-links">
            {QUICK.map((name) => (
              <button
                type="button"
                key={name}
                className="t-cmd"
                onClick={() => run(`portfolio ${name}`)}
              >
                {name}
              </button>
            ))}
          </dd>
        </div>
        <div className="t-fetch-row" style={{ "--i": 7 }}>
          <dt>cv</dt>
          <dd className="t-fetch-links">
            <button type="button" className="t-cmd" onClick={() => run("portfolio cv")}>
              [view]
            </button>
            <a className="t-cmd" href={profile.cvHref} download>
              [download]
            </a>
          </dd>
        </div>
        <div className="t-fetch-row" style={{ "--i": 8 }}>
          <dt>links</dt>
          <dd className="t-fetch-links">
            {socials.map((s) => (
              <a
                key={s.label}
                className="t-cmd"
                href={s.href}
                {...(s.icon === "mail" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              >
                [{s.label.toLowerCase()}]
              </a>
            ))}
          </dd>
        </div>
      </dl>
      {first ? (
        <p className="t-line t-dim t-fetch-hint" style={{ "--i": 9 }}>
          pick a section, or type{" "}
          <span className="t-strong">portfolio --help</span> for every command
        </p>
      ) : null}
    </div>
  );
}
