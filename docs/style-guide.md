# Portfolio Style Guide

This guide defines a consistent visual and implementation system for this project and any related subdomains.

## 1. Design Principles

- Keep interfaces minimal, editorial, and high-contrast.
- Use motion sparingly to support hierarchy and state change.
- Prefer readable rhythm over dense layouts.
- Reuse a small set of primitives and tokens before creating one-off styles.

## 2. Brand Foundation

### Color Tokens

Use these as your canonical palette:

- `--bg`: `#0c0c0b` (main background)
- `--bg2`: `#141413` (secondary background)
- `--fg`: `#edede8` (primary text)
- `--muted`: `#93938f` (secondary text)
- `--border`: `rgba(237, 237, 232, 0.09)` (subtle separators)
- `--border-hover`: `rgba(237, 237, 232, 0.38)` (hover/active separators)
- `--accent`: `#ff3d00` (primary accent)
- `--accent2`: `#ff7a5c` (accent gradient pair)

Usage rules:

- Use `--fg` on `--bg` for primary content.
- Use `--muted` for supporting text, metadata, and labels.
- Use accent colors only for highlights, not large text blocks.
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
- Pill radius: `999px`
- Global transition token:
  - `--transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

Animation rules:

- Keep loops subtle and low-frequency.
- Avoid more than one continuously looping animation per section.
- Prefer opacity/transform over layout-affecting properties.

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

### Pills/Tags

Use pills for status, skills, and micro-metadata.

Pill defaults:

- Border: `1px solid var(--border)`
- Radius: `999px`
- Size: compact (`0.38rem-0.66rem` text size depending on role)
- Uppercase, tracked text for utility tags

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

## 8. Subdomain Reuse Strategy

For each subdomain (for example: blog, lab, writing), keep the same design language by reusing tokens and primitives.

### Shared Foundation (must stay identical)

- Global token names and values
- Typography families and weight ranges
- Radius and transition tokens
- Section wrapper behavior (`PageSection` contract)
- Breakpoint set

### Allowed Variation Per Subdomain

- Accent pair (`--accent`, `--accent2`)
- Hero composition and imagery
- Component mix (cards, timeline, gallery, list)
- Maximum content width where domain requires it

### Setup Checklist For A New Subdomain

1. Copy token block and reset rules from `src/index.css`.
2. Copy `PageSection` implementation and keep token names unchanged.
3. Reuse section header pattern and card/pill primitives.
4. Apply only accent-level visual variation first.
5. Validate mobile behavior at `64rem` and `42rem`.
6. Run an accessibility pass for contrast and keyboard focus.

## 9. Copy-Ready Starter Tokens

Use this as the base in any new subdomain stylesheet:

```css
:root {
  --bg: #0c0c0b;
  --bg2: #141413;
  --fg: #edede8;
  --muted: #93938f;
  --border: rgba(237, 237, 232, 0.09);
  --border-hover: rgba(237, 237, 232, 0.38);
  --accent: #ff3d00;
  --accent2: #ff7a5c;
  --radius: 14px;
  --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## 10. Governance

When adding new UI:

- Add tokens before adding one-off hard-coded values.
- Reuse an existing pattern before creating a new pattern.
- If a new pattern is needed, document it here with usage rules.
- Keep visual changes incremental and auditable.
