export default function AboutToolkit({ toolkit }) {
  return (
    <div className="about-toolkit">
      <h3 className="detail-h">Toolkit</h3>
      <div className="toolkit-groups">
        {toolkit.map((group) => (
          <div className="toolkit-group" key={group.group}>
            <p className="toolkit-group-label">{group.group}</p>
            <div className="skills-row">
              {group.items.map((item) => (
                <span className="skill-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
