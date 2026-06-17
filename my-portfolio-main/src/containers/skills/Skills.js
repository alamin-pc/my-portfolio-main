import React, {useContext} from "react";
import "./Skills.scss";
import {skillsSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }

  // Use categories from portfolio.js, fallback to empty array
  const skillCategories = skillsSection.categories || [];
  const softSkillsCategories = skillsSection.softSkillsCategories || [];

  // Software skill icons from portfolio.js
  const softwareSkills = skillsSection.softwareSkills || [];

  return (
    <div id="skills" className={isDark ? "dark-mode" : ""}>
      <div className="sk-main">
        {/* Header */}
        <div className="sk-header">
          <h1 className="skills-heading">{skillsSection.title}</h1>
          <p className={`sk-subtitle ${isDark ? "dark-mode" : ""}`}>
            {skillsSection.subTitle}
          </p>
        </div>

        {/* Icon Bar */}
        <div className="sk-icons-bar">
          {softwareSkills.map((skill, i) => (
            <div key={i} className="sk-icon-item" title={skill.skillName}>
              <i
                className={skill.fontAwesomeClassname}
                style={skill.style}
              ></i>
              <span className={`sk-icon-label ${isDark ? "dark-mode" : ""}`}>
                {skill.skillName}
              </span>
            </div>
          ))}
        </div>

        {/* Compact Category Grid */}
        <div className="sk-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className={`sk-cat ${isDark ? "dark-mode" : ""}`}>
              <div className="sk-cat-head">
                <span className="sk-cat-emoji">{cat.emoji}</span>
                <h3 className={`sk-cat-title ${isDark ? "dark-mode" : ""}`}>
                  {cat.title}
                </h3>
              </div>
              <div
                className="sk-cat-divider"
                style={{
                  background: `linear-gradient(90deg, ${cat.color}60, transparent)`
                }}
              ></div>
              <div className="sk-tags">
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`sk-tag ${isDark ? "dark-mode" : ""}`}
                    style={{
                      "--tag-color": cat.color,
                      borderColor: isDark ? `${cat.color}40` : `${cat.color}50`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills Section */}
        {softSkillsCategories.length > 0 && (
          <div className="sk-soft-section" style={{marginTop: "48px"}}>
            <div className="sk-header">
              <h1 className="skills-heading">Soft Skills</h1>
              {skillsSection.softSkillsStatement && (
                <p className={`sk-subtitle ${isDark ? "dark-mode" : ""}`}>
                  {skillsSection.softSkillsStatement}
                </p>
              )}
            </div>
            <div className="sk-grid soft-grid">
              {softSkillsCategories.map((cat, idx) => (
                <div key={idx} className={`sk-cat ${isDark ? "dark-mode" : ""}`}>
                  <div className="sk-cat-head">
                    <span className="sk-cat-emoji">{cat.emoji}</span>
                    <h3 className={`sk-cat-title ${isDark ? "dark-mode" : ""}`}>
                      {cat.title}
                    </h3>
                  </div>
                  <div
                    className="sk-cat-divider"
                    style={{
                      background: `linear-gradient(90deg, ${cat.color}60, transparent)`
                    }}
                  ></div>
                  <div className="sk-tags">
                    {cat.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`sk-tag ${isDark ? "dark-mode" : ""}`}
                        style={{
                          "--tag-color": cat.color,
                          borderColor: isDark
                            ? `${cat.color}40`
                            : `${cat.color}50`
                        }}
                      >
                        ➷ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
