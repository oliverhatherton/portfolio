/* A clickable command — runs the full `portfolio <sub>` form. */
export default function Cmd({ sub, ctx, children }) {
  return (
    <button
      type="button"
      className="t-cmd"
      onClick={() => ctx.run(`portfolio ${sub}`)}
    >
      {children || sub}
    </button>
  );
}
