export default function AboutSkillsSection({ skills }) {
  return (
    <div>
      <h3 className="detail-h">Skills</h3>
      <div className="skills-row">
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
