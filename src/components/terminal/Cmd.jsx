/* A clickable command. Runs the full `portfolio <sub>` form by default,
   or just `sub` itself when raw (for standalone commands like `clear`). */
export default function Cmd({ sub, ctx, raw, children }) {
  return (
    <button
      type="button"
      className="t-cmd"
      onClick={() => ctx.run(raw ? sub : `portfolio ${sub}`)}
    >
      {children || sub}
    </button>
  );
}
