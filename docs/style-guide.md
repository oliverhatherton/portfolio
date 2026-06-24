# Portfolio Style Guide

This guide defines a consistent visual and implementation system for this project and any related subdomains.

## 1. Design Principles

- Keep interfaces minimal, editorial, and high-contrast.
- Use motion sparingly to support hierarchy and state change.
- Prefer readable rhythm over dense layouts.
- Reuse a small set of primitives and tokens before creating one-off styles.
- Keep the layout feeling open and architectural: avoid heavy boxed UI shells.
- Keep the visual language intentionally monotone first, then add accent only where meaning is needed.

Interpretation notes:

- This system is designed to feel like one continuous canvas, not a dashboard made of stacked container boxes.
- Most surfaces should remain close to the background range (`--bg`/`--bg2`) with separation coming from spacing, typography, and subtle borders.
- Accent color exists to direct attention, not to decorate every component.

## 2. Brand Foundation

### Color Tokens

Use these as your canonical palette:

- `--bg`: `#0c0c0b` (main background)
- `--bg2`: `#141413` (secondary background)
- `--surface`: `rgba(237, 237, 232, 0.025)` (faint raised surface for cards/figures)
- `--fg`: `#edede8` (primary text)
- `--muted`: `#93938f` (secondary text)
- `--muted-strong`: `#b6b6b1` (brighter muted — tag/pill labels, tech tokens)
- `--border`: `rgba(237, 237, 232, 0.09)` (subtle separators)
- `--border-hover`: `rgba(237, 237, 232, 0.38)` (hover/active separators)
- `--accent`: `#ff3d00` (primary accent)
- `--accent2`: `#ff7a5c` (accent gradient pair)
- `--accent-soft`: `rgba(255, 61, 0, 0.14)` (glow washes, `::selection`)

A semantic "live/available" green is used sparingly for status only (availability
pill, live project dot): base `#00dc64`, mixed lighter for text
(`color-mix(in srgb, #00dc64 82%, white 18%)`). It is a status signal, not a
palette color — do not use it for general UI.

Usage rules:

- Use `--fg` on `--bg` for primary content.
- Use `--muted` for supporting text, metadata, and labels; `--muted-strong` when a
  muted element needs slightly more presence (e.g. tech tags).
- Use `--surface` for the faint fill on cards, stat figures, and labelled links —
  never a hard opaque panel.
- Use accent colors only for highlights, glows, and gradient text accents, not
  large text blocks.
- Keep gradients subtle, mostly overlays with low opacity.

### Typography

- Heading/display family: `Syne`, weight `700-800`
- Body/UI family: `Inter`, weight `300-600`

Role mapping:

- Display headlines (`h1` hero): `Syne 800`, tight line-height (`~0.84`)
- Section titles (`h2`): `Syne 700-800`, line-height (`~0.92`)
- Body copy: `Inter 300-400`, line-height (`1.6-1.7`)
- Labels/meta: `Inter 500`, uppercase, letter spacing `0.1em-0.18em`

### Radius and Motion

- Corner radius token: `--radius: 14px`
- Large radius token: `--radius-lg: 20px` (larger surfaces, hero-scale cards)
- Pill radius: `999px`
- Transition tokens:
  - `--transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)` (section/structural motion)
  - `--transition-fast: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)` (hovers, micro-interactions)

Animation rules:

- Use `--transition-fast` for hover/focus feedback (color, border, small
  `translateY(-2px)` lifts); use `--transition` for larger/structural changes.
- Keep loops subtle and low-frequency.
- Avoid more than one continuously looping animation per section.
- Prefer opacity/transform over layout-affecting properties.

### Base / Global Styles

Every deployment inherits the same base layer from `src/index.css`:

- Body uses font smoothing (`-webkit-font-smoothing: antialiased`) and
  `text-rendering: optimizeLegibility`.
- `::selection` uses `--accent-soft` background with `--fg` text.
- Global `:focus-visible` ring: `2px solid color-mix(in srgb, var(--accent2) 70%, transparent)` with `outline-offset: 3px`.
- A global `prefers-reduced-motion` guard disables animations and long transitions.

```css
::selection {
  background: var(--accent-soft);
  color: var(--fg);
}

:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent2) 70%, transparent);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 3. Layout System

Use `PageSection` as the base wrapper for every top-level section.

Section tokens:

- `--page-section-padding`
- `--page-section-content-width`

Base pattern:

```css
.page-section {
  width: 100%;
  padding: var(--page-section-padding, 4rem 1.5rem);
}

.page-section > * {
  width: min(var(--page-section-content-width, 72rem), 100%);
  margin-inline: auto;
}
```

Standards:

- Desktop side padding: `clamp(1.2rem, 3.4vw, 2.75rem)`
- Mobile side padding: `1rem`
- Typical vertical spacing:
  - Section: `clamp(5rem, 8vw, 7.5rem)`
  - Internal block gaps: `clamp(1.6rem, 4vw, 3.5rem)`
- Content max width for broad sections: `110rem`

Container policy (important):

- Do not wrap the entire page in a central framed "app container".
- Do not introduce large, opaque box backgrounds around major sections unless a section's content truly requires local contrast.
- Prefer full-bleed section rhythm and centered inner content rails over "boxed card stacking".
- If a local container is needed for readability, keep it visually quiet: low-contrast background, thin border, and generous spacing.

## 4. Responsive Breakpoints

Use these breakpoints consistently:

- `64rem` (~1024px): desktop to tablet grid shifts
- `56rem` (~896px): hide secondary decorative UI when needed
- `42rem` (~672px): primary mobile breakpoint
- `48rem` + landscape + height checks: compact landscape handling

Rules:

- Collapse multi-column layouts progressively (`3 -> 2 -> 1`).
- Reduce type and spacing at `42rem` instead of introducing alternate components.
- Hide decorative non-essential elements first on small screens.

## 5. Component Patterns

### Headers

Shared semantic structure for section headers:

- label (`.s-label` / `.projects-label`)
- title (`.s-title` / `.projects-title`)
- optional supporting note

Guidelines:

- Keep labels uppercase and tracked.
- Keep titles short enough to wrap gracefully.
- Keep supporting note width around `34ch` where possible.

### Cards

Use low-contrast cards with subtle hover lift.

Card defaults:

- Border: `1px solid var(--border)`
- Radius: `var(--radius)`
- Background: faint linear overlay
- Hover:
  - Border to `var(--border-hover)`
  - `transform: translateY(-2px)`

Card restraint rule:

- Cards should organize content, not dominate the page chrome.
- Avoid turning every block into a card; use whitespace and typographic hierarchy first.

### Pills/Tags

Use pills for status, skills, and micro-metadata.

Pill defaults:

- Border: `1px solid var(--border)`
- Radius: `999px`
- Size: compact (`0.38rem-0.66rem` text size depending on role)
- Uppercase, tracked text for utility/status tags (e.g. `LOCATION`, `LIVE`)
- Tech/skill tags use sentence case, `--muted-strong` text, and brighten to
  `--fg` with `--border-hover` on hover

### Grouped Tags (Toolkit)

When listing technologies or capabilities, group them under short uppercase
labels rather than one flat cloud. Each group is a label + a wrapping pill row.

- Group label: `0.64rem`, uppercase, `0.12em` tracking, `--muted`
- Pills: tech-tag style above
- Stack groups with `~1rem` gap

This is the canonical way to present a stack/skill set across subdomains.

### Stat Figures

Use a figures strip to surface a few hard numbers (counts, percentages, ranks).

- Grid of equal cells, `--surface` fill, `--border`, `--radius-lg`
- Value: `Syne 800`, large, with an accent gradient text treatment
- Label: `~0.72rem`, `--muted`
- Hover: border to `--border-hover`, slightly lighter fill
- Keep to 3-4 figures; collapse `4 -> 2` columns at `42rem`

Feature one figure (the headline achievement) with an accent variant: an
accent-tinted border (`color-mix(in srgb, var(--accent) 38%, transparent)`), a
faint `--accent-soft` gradient fill, and an accent gradient on the value
(`linear-gradient(120deg, var(--accent2), var(--accent))`). Use this for at most
one figure so it stays the focal point.

```css
.figure-value {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  background: linear-gradient(120deg, var(--fg), var(--accent2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Gradient-on-text is the one approved decorative use of the accent in large type.
Use it only for short display figures, never for body or sentence-length text.

### Social / Contact Links

A single shared `SocialLinks` primitive with two variants, driven by one data
source (`src/data/profile.js`). Reuse it verbatim on every subdomain so links and
handles stay in sync.

- `compact` — icon-only circular buttons (`2.4rem`), for headers/heroes. Hover
  lifts `-2px`, fills `--surface`, brightens to `--fg`.
- `expanded` — labelled rows (icon + label + handle) in `--radius` cards with
  `--surface` fill, for contact sections.

Icons are inline SVG (GitHub, LinkedIn, mail), never emoji. Icon-only links carry
an `.sr-only` label for screen readers.

### Status Dot

A small pulsing dot signals live/available state, paired with text (never color
alone):

- Availability: `--muted`-adjacent green, gentle opacity pulse (`2s`)
- Live project: green dot with an expanding `box-shadow` ping (`~2.4s`)
- Hero eyebrow: solid `--accent` dot with a soft accent glow (no animation)

### Accent Glow

For hero/landing atmosphere, layer one or two large, low-opacity radial gradients
behind the content (using `--accent-soft` and a faint `--accent2` wash). Use at
most one glow layer per page. It sets mood, not section decoration.

Make the glow full-bleed. `PageSection` centres its direct children inside a
content rail, so a glow placed as a child gets clipped to that rail and stops
short of the screen edges. Put the glow on the section itself with `::before`,
which spans the full section width:

```css
.hero-section {
  position: relative;
  overflow-x: clip;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(70rem 48rem at 22% 32%, var(--accent-soft), transparent 70%),
    radial-gradient(56rem 40rem at 88% 14%, rgba(255, 122, 92, 0.05), transparent 72%);
}

.hero-shell {
  position: relative;
  z-index: 1;
}
```

### Contact / Footer Section

Close every page with a contact section as the final `PageSection`:

- Two columns: a `Syne 800` headline + lead + email CTA + availability status on
  the left; `SocialLinks` (`expanded`) on the right. Collapse to one column at `64rem`.
- Email CTA: `Syne 700`, animated underline grown via `background-size` on hover.
- A thin `--border`-topped footer row with copyright + a short tagline.

### Voice & Copy

Keep written copy in a plain, direct, first-person voice. The rules below come
from the `stop-slop` skill and apply to every subdomain:

- Write in active voice. Put a person (usually "I") at the front of the sentence.
- Cut adverbs and filler ("really", "just", "always", "simply").
- No em dashes. Use commas or full stops.
- Two items beat three. Avoid the rhythmic list-of-three.
- State the point. Skip throat-clearing ("Here's what", "The truth is").
- Name specifics (numbers, tech, places) instead of vague claims.
- Vary sentence length so paragraphs do not read metronomic.

## 6. Accessibility and Quality Bar

- Maintain body contrast at least WCAG AA (`4.5:1`) when introducing new colors.
- Preserve visible focus states for links and controls.
- Ensure all text remains readable at 200% zoom.
- Avoid using color alone to communicate state.
- Keep animation respectful of reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 7. CSS Architecture Rules

- Keep component-local styles in each component folder.
- Use one stylesheet per component (`component-name.css`).
- Prefer section-scoped class prefixes:
  - `hero-*`, `about-*`, `projects-*`
- Avoid deep selector chains.
- Avoid global element styling outside `src/index.css` resets/tokens.
- Reset default UA spacing on structural lists. A `<ul>`/`<ol>`/`<dl>` used for
  layout keeps its browser `margin` and `padding-inline-start` (~40px) unless you
  zero them, which silently indents rows out of alignment with their heading. Set
  `margin: 0; padding: 0` whenever you set `list-style: none`.

## 8. Subdomain Reuse Strategy

For each subdomain (for example: blog, lab, writing), keep the same design language by reusing tokens and primitives.

This includes keeping the same overall temperament: sparse, deliberate, mostly monotone, with restrained accents.

### Shared Foundation (must stay identical)

- Global token names and values
- Typography families and weight ranges
- Radius and transition tokens
- Section wrapper behavior (`PageSection` contract)
- Breakpoint set
- Open-canvas layout approach (no global framed container box)
- Monotone baseline palette behavior

### Allowed Variation Per Subdomain

- Accent pair (`--accent`, `--accent2`)
- Hero composition and imagery
- Component mix (cards, timeline, gallery, list)
- Maximum content width where domain requires it

Keep in mind:

- Variation should not replace the monotone-first baseline with rainbow UI.
- If introducing additional colors, they must remain secondary to `--bg`, `--bg2`, `--fg`, and `--muted`.

### Required Back Navigation For Non-Portfolio Deployments

If this design system is used on any site that is not the main portfolio, include a visible back link near the top of the page to return to the main site.

Requirement:

- Place a "Back to oliverhatherton.com" control near the top-left region, above or adjacent to the first major heading.
- Link target must be `https://oliverhatherton.com`.
- Keep styling lightweight and consistent with the system: subtle border, muted text, compact pill/inline-link treatment.
- Preserve keyboard focus visibility and clear hover/active states.

Reference markup pattern:

```html
<a class="site-back-link" href="https://oliverhatherton.com">
  Back to oliverhatherton.com
</a>
```

Reference style pattern:

```css
.site-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted);
  text-decoration: none;
  transition: var(--transition);
}

.site-back-link:hover,
.site-back-link:focus-visible {
  border-color: var(--border-hover);
  color: var(--fg);
}
```

### Setup Checklist For A New Subdomain

1. Copy the token block, base/global styles, and reset rules from `src/index.css`.
2. Copy `PageSection`, `Icon`, and `SocialLinks` (+ `src/data/profile.js`); keep
   token and component names unchanged.
3. Reuse section header, card, pill, grouped-tag, stat-figure, and contact/footer
   patterns before authoring anything new.
4. Add the required "Back to oliverhatherton.com" link (see below) on any
   non-portfolio deployment.
5. Apply only accent-level visual variation first.
6. Validate mobile behavior at `64rem` and `42rem`; confirm no horizontal scroll.
7. Run an accessibility pass for contrast, `:focus-visible`, and reduced motion.

## 9. Copy-Ready Starter Tokens

Use this as the base in any new subdomain stylesheet:

```css
:root {
  --bg: #0c0c0b;
  --bg2: #141413;
  --surface: rgba(237, 237, 232, 0.025);
  --fg: #edede8;
  --muted: #93938f;
  --muted-strong: #b6b6b1;
  --border: rgba(237, 237, 232, 0.09);
  --border-hover: rgba(237, 237, 232, 0.38);
  --accent: #ff3d00;
  --accent2: #ff7a5c;
  --accent-soft: rgba(255, 61, 0, 0.14);
  --radius: 14px;
  --radius-lg: 20px;
  --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-fast: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

Shared primitives to copy alongside the tokens (keep names unchanged):

- `PageSection` — section wrapper contract
- `Icon` (`src/components/icon`) — inline SVG set
- `SocialLinks` (`src/components/socialLinks`) + `src/data/profile.js` — links/handles
- Stat figures, grouped-tag (toolkit), card, pill, and contact/footer patterns

## 10. Governance

When adding new UI:

- Add tokens before adding one-off hard-coded values.
- Reuse an existing pattern before creating a new pattern.
- If a new pattern is needed, document it here with usage rules.
- Keep visual changes incremental and auditable.
