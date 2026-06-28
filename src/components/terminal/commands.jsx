import { profile, socials } from "../../data/profile";
import {
  bioParagraphs,
  experience,
  skills,
  grades,
  achievements,
  projects as dataProjects,
  interests,
  values,
  currently,
} from "../../data/content";
import Cmd from "./Cmd.jsx";
import NextRaceLine from "./NextRaceLine.jsx";

const ROADMAP_GLYPH = { done: "✓", progress: "◐", planned: "○" };

const CURRENTLY_SECTIONS = [
  { key: "workingOn", label: "working on" },
  { key: "learning", label: "learning" },
  { key: "watching", label: "watching" },
  { key: "lookingFor", label: "looking for" },
];

const CONTACT_COPY =
  "Looking for graduate backend roles starting from mid-2027 at a company where I can work on real engineering challenges and big systems, and find the elegant solution rather than just a working one.";

/* Tries to open the section's desktop app window; if that's not available
   (mobile, or window manager declined) renders the plain terminal output
   instead. The window title and the "opened" message always use the command
   name, so they stay consistent with what you typed. */
function openOrInline(ctx, id, windowConfig, inlineNode) {
  const opened = ctx?.openWindow?.(id, { ...windowConfig, title: id });
  if (opened) {
    return (
      <p className="t-line">
        → opened <span className="t-strong">{id}</span>
      </p>
    );
  }
  return inlineNode;
}

/* ---- Subcommands: invoked as `portfolio <name>` ---- */
export const subcommands = {
  about: {
    desc: "who I am",
    aliases: ["bio", "whoami", "me", "intro"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "about",
        {
          app: "notes",
          props: { paragraphs: bioParagraphs },
          width: 420,
          height: 520,
        },
        <div className="t-block">
          {bioParagraphs.map((p, i) => (
            <p className="t-line" key={i}>
              {p}
            </p>
          ))}
          <p className="t-line t-dim">values: {values.join(" · ")}</p>
        </div>,
      ),
  },

  currently: {
    desc: "what I'm up to right now",
    aliases: ["now"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "currently",
        {
          app: "dashboard",
          props: { currently },
          width: 520,
          height: 560,
        },
        <div className="t-groups">
          {CURRENTLY_SECTIONS.map(({ key, label }) => (
            <div className="t-group" key={key}>
              <p className="t-line t-strong">{label}</p>
              <ul className="t-bullets">
                {key === "watching" ? (
                  <NextRaceLine />
                ) : (
                  currently[key].map((item) => (
                    <li className="t-line" key={item}>
                      → {item}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>,
      ),
  },

  experience: {
    desc: "where I've worked & studied",
    aliases: ["work", "timeline", "jobs"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "experience",
        {
          app: "timeline",
          props: { items: experience },
          width: 460,
          height: 480,
        },
        <div className="t-groups">
          {experience.map((item) => (
            <div className="t-group" key={item.title + item.meta}>
              <p className="t-line t-strong">
                {item.title} · {item.meta}
              </p>
              <p className="t-line t-dim">{item.subtitle}</p>
            </div>
          ))}
        </div>,
      ),
  },

  grades: {
    desc: "degree classification & module marks",
    aliases: ["academics", "marks", "results"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "grades",
        {
          app: "transcript",
          props: grades,
          width: 420,
          height: 460,
        },
        <div className="t-block">
          <p className="t-line t-strong">{grades.classification}</p>
          <div className="t-rate-list">
            {grades.modules.map((m) => (
              <div className="t-rate-row" key={m.name}>
                <span className="t-rate-name">{m.name}</span>
                <span className="t-rate-dots" aria-hidden="true" />
                <span className="t-rate-score">{m.mark}</span>
              </div>
            ))}
          </div>
          <p className="t-line t-dim">{grades.note}</p>
        </div>,
      ),
  },

  skills: {
    desc: "languages & tools I'm confident with",
    aliases: ["stack", "tools", "tech"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "skills",
        {
          app: "skills",
          props: { groups: skills },
          width: 480,
          height: 420,
        },
        <div className="t-groups">
          {skills.map((g) => (
            <div className="t-group" key={g.group}>
              <p className="t-line t-strong">{g.group.toLowerCase()}</p>
              <p className="t-line t-dim">{g.items.join(", ")}</p>
            </div>
          ))}
        </div>,
      ),
  },

  achievements: {
    desc: "things I'm genuinely proud of",
    aliases: ["wins", "highlights"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "achievements",
        {
          app: "trophy",
          props: { achievements },
          width: 440,
          height: 480,
        },
        <div className="t-groups">
          {achievements.map((a) => (
            <div className="t-group" key={a.title}>
              <p className="t-line t-strong">{a.title}</p>
              <p className="t-line t-dim">{a.detail}</p>
            </div>
          ))}
        </div>,
      ),
  },

  projects: {
    desc: "what I build to learn",
    aliases: ["project", "flagship", "build"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "projects",
        {
          app: "blog",
          props: { posts: dataProjects },
          width: 540,
          height: 580,
        },
        <div className="t-projects">
          {dataProjects.map((p) => (
            <div className="t-proj" key={p.name}>
              <p className="t-line t-strong">{p.title}</p>
              <p className="t-line t-dim">{p.tagline}</p>
              {p.flow ? <p className="t-line">{p.flow}</p> : null}

              <p className="t-line t-strong">focus areas</p>
              <ul className="t-bullets">
                {p.focus.map((f) => (
                  <li className="t-line" key={f}>
                    • {f}
                  </li>
                ))}
              </ul>

              <p className="t-line t-strong">stack</p>
              <p className="t-line t-dim">{p.stack.join(", ")}</p>

              {p.roadmap ? (
                <>
                  <p className="t-line t-strong">roadmap</p>
                  <ul className="t-bullets">
                    {p.roadmap.map((r) => (
                      <li className="t-line" key={r.label}>
                        <span className={`t-glyph t-glyph-${r.status}`}>
                          {ROADMAP_GLYPH[r.status]}
                        </span>{" "}
                        {r.label}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>,
      ),
  },

  interests: {
    desc: "outside of a keyboard",
    aliases: ["hobbies"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "interests",
        {
          app: "gallery",
          props: { interests },
          width: 580,
          height: 600,
        },
        <div className="t-groups">
          {interests.map((item) => (
            <div className="t-group" key={item.title}>
              <p className="t-line t-strong">{item.title}</p>
              <p className="t-line t-dim">{item.detail}</p>
            </div>
          ))}
        </div>,
      ),
  },

  contact: {
    desc: "how to reach me",
    aliases: ["email", "hire"],
    run: (ctx) =>
      openOrInline(
        ctx,
        "contact",
        {
          app: "contact",
          props: {
            name: profile.name,
            email: profile.email,
            socials: socials.filter((s) => s.icon !== "mail"),
            copy: CONTACT_COPY,
          },
          width: 360,
          height: 480,
        },
        <div className="t-block">
          <p className="t-line">{CONTACT_COPY}</p>
          <div className="t-lines">
            <p className="t-line">
              email:{" "}
              <a className="t-cmd" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </p>
            {socials
              .filter((s) => s.icon !== "mail")
              .map((s) => (
                <p className="t-line" key={s.label}>
                  {s.label.toLowerCase()}:{" "}
                  <a
                    className="t-cmd"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.handle}
                  </a>
                </p>
              ))}
          </div>
        </div>,
      ),
  },

  cv: {
    desc: "open my CV (PDF)",
    aliases: ["resume"],
    run: (ctx) => {
      const opened = ctx?.openWindow?.("cv", {
        title: "cv",
        app: "pdf",
        props: { href: profile.cvHref, title: "Oliver-Atherton-CV.pdf" },
        width: 540,
        height: 720,
      });
      if (opened) {
        return (
          <p className="t-line">
            → opened <span className="t-strong">cv</span>
          </p>
        );
      }

      if (typeof window !== "undefined") window.open(profile.cvHref, "_blank");
      return (
        <p className="t-line">
          opening Oliver-Atherton-CV.pdf in a new tab… if it didn't open,{" "}
          <a
            className="t-cmd"
            href={profile.cvHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </p>
      );
    },
  },

  all: {
    desc: "output everything at once",
    run: (ctx) => {
      const opened = ctx?.openWindow?.("all", {
        title: "all",
        app: "all",
        props: {
          data: {
            bioParagraphs,
            values,
            experience,
            achievements,
            grades,
            skills,
            projects: dataProjects,
            currently,
            interests,
            contact: {
              copy: CONTACT_COPY,
              email: profile.email,
              socials: socials.filter((s) => s.icon !== "mail"),
            },
          },
        },
        width: 560,
        height: 640,
      });
      if (opened) {
        return (
          <p className="t-line">
            → opened <span className="t-strong">all</span>
          </p>
        );
      }

      return (
        <div className="t-all">
          {ALL_ORDER.map((name) => (
            <section className="t-section" key={name}>
              <p className="t-line t-dim">## {name}</p>
              {subcommands[name].run({ run: ctx.run })}
            </section>
          ))}
        </div>
      );
    },
  },
  sudo: {
    hidden: true,
    run: () => (
      <p className="t-line">nice try! you don't have the keys to this box.</p>
    ),
  },
};

/* Recruiter-relevant signals first, personal/dynamic bits toward the end. */
const ALL_ORDER = [
  "about",
  "experience",
  "projects",
  "skills",
  "achievements",
  "grades",
  "currently",
  "interests",
  "contact",
];

/* Order + descriptions shown by `portfolio --help`. */
const HELP_ORDER = [
  "about",
  "experience",
  "projects",
  "skills",
  "achievements",
  "grades",
  "currently",
  "interests",
  "contact",
  "cv",
  "all",
  "clear",
];
/* Commands that take the `portfolio` prefix, in display order. `clear` is a
   standalone command and is shown separately below. */
const MENU = HELP_ORDER.filter((n) => n !== "clear");

export function renderHelp(ctx) {
  return (
    <div className="t-block">
      <p className="t-line t-dim">
        usage: <span className="t-strong">portfolio &lt;command&gt;</span>
      </p>
      <ul className="t-list">
        {MENU.map((name) => (
          <li className="t-list-row" key={name}>
            <Cmd sub={name} ctx={ctx}>
              {name}
            </Cmd>
            <span className="t-dim">{subcommands[name]?.desc}</span>
          </li>
        ))}
      </ul>
      <p className="t-line t-dim">
        and <Cmd sub="clear" ctx={ctx} raw>clear</Cmd> on its own (no portfolio
        prefix) to clear the screen
      </p>
      <p className="t-line t-dim">↑/↓ history · Tab autocomplete</p>
    </div>
  );
}

/* alias resolution */
const SUB_ALIAS = (() => {
  const m = {};
  Object.entries(subcommands).forEach(([name, def]) => {
    m[name] = name;
    (def.aliases || []).forEach((a) => (m[a] = name));
  });
  return m;
})();

export function resolveSub(name) {
  const key = SUB_ALIAS[name];
  return key ? subcommands[key] : null;
}

/* names offered by Tab autocomplete (after `portfolio `), kept in help order. */
export const subNames = [
  ...HELP_ORDER.filter((n) => n !== "clear"),
  "clear",
  "--help",
];
