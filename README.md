# Portfolio — Interactive Terminal

Source for [oliverhatherton.com](https://oliverhatherton.com): a personal
portfolio rebuilt as a black-and-green, mac-windowed terminal you navigate
with `portfolio <command>` instead of scrolling a marketing-style page.

## Commands

| Command | Aliases | Shows |
| --- | --- | --- |
| `about` | `bio`, `whoami`, `me`, `intro` | who I am |
| `currently` | `now` | what I'm working on / learning / watching right now |
| `experience` | `work`, `timeline`, `jobs` | work history |
| `grades` | `academics`, `marks`, `results` | degree results |
| `skills` | `stack`, `tools`, `tech` | technical skills |
| `achievements` | `wins`, `highlights` | notable wins |
| `projects` | `project`, `flagship`, `build` | featured projects |
| `interests` | `hobbies` | outside of code |
| `contact` | `email`, `hire` | how to reach me |
| `cv` | `resume` | link to my CV |
| `all` | — | runs every section in sequence |

Each command either opens a draggable, resizable desktop-style window
(`src/components/windows`) or falls back to inline terminal output when a
window can't be opened (mobile, or the window manager declines).

## Stack

React 19 (no compiler) · Vite · plain CSS, no framework — see
[`docs/style-guide.md`](docs/style-guide.md) for the palette, spacing, and
component conventions used across the terminal and window components.

## Running locally

```bash
npm install
npm run dev
```

`npm run build` outputs to `dist/`; `npm run lint` runs ESLint.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy-prod-pages.yml`](.github/workflows/deploy-prod-pages.yml),
which builds the site and publishes `dist/` to the `prod` branch via GitHub
Pages, served at the custom domain in [`CNAME`](CNAME).
