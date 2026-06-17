import React, {useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);

  if (!workExperiences.display) {
    return null;
  }

  // Color map for section types
  const sectionColors = {
    research: "#8b5cf6",
    professional: "#3b82f6",
    industrial: "#0ea5e9",
    teaching: "#10b981"
  };

  const getSectionColor = (title) => {
    const t = title.toLowerCase();
    if (t.includes("research")) return sectionColors.research;
    if (t.includes("professional")) return sectionColors.professional;
    if (t.includes("industrial")) return sectionColors.industrial;
    if (t.includes("teaching")) return sectionColors.teaching;
    return "#3b82f6";
  };

  return (
    <div className="ex-main" id="experience">
      <div className={`ex-container ${isDark ? "dark-mode" : ""}`}>
        {/* Header */}
        <div className="ex-header">
          <h1 className="skills-heading">
            <span className="name-gradient">Experiences</span>
          </h1>
        </div>

        {/* All Sections */}
        <div className="ex-sections">
          {workExperiences.sections.map((section, sIdx) => {
            const color = getSectionColor(section.title);
            return (
              <div key={sIdx} className="ex-section">
                {/* Section Title */}
                <div className="ex-section-head">
                  <div
                    className="ex-section-dot"
                    style={{background: color}}
                  ></div>
                  <h2 className={`ex-section-title ${isDark ? "dark-mode" : ""}`}>
                    {section.title}
                  </h2>
                  <div
                    className="ex-section-line"
                    style={{background: `linear-gradient(90deg, ${color}40, transparent)`}}
                  ></div>
                </div>

                {/* Experience Cards */}
                <div className="ex-cards">
                  {section.experiences.map((exp, eIdx) => {
                    const hasBullets = exp.descBullets && exp.descBullets.length > 0;

                    return (
                      <div
                        key={eIdx}
                        className={`ex-card ${isDark ? "dark-mode" : ""}`}
                        style={{"--accent": color}}
                      >
                        {/* Card Main Row */}
                        <div className="ex-card-row">
                          {/* Info */}
                          <div className="ex-info">
                            <div className="ex-info-top">
                              <h3 className={`ex-role ${isDark ? "dark-mode" : ""}`}>
                                {exp.title}
                              </h3>
                              <span className={`ex-date ${isDark ? "dark-mode" : ""}`}>
                                {exp.date}
                              </span>
                            </div>
                            <div className="ex-info-bottom">
                              {exp.url ? (
                                <a
                                  href={exp.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ex-company-link"
                                  style={{color: color}}
                                  onClick={(e) => e.stopPropagation()}
                                  dangerouslySetInnerHTML={{__html: exp.company}}
                                >
                                </a>
                              ) : (
                                <span 
                                  className="ex-company" 
                                  style={{color: color}}
                                  dangerouslySetInnerHTML={{__html: exp.company}}
                                >
                                </span>
                              )}
                              {exp.url && <i className="fas fa-external-link-alt" style={{color: color, fontSize: "9px", marginLeft: "4px"}}></i>}
                              <p className={`ex-desc ${isDark ? "dark-mode" : ""}`}>
                                {exp.desc}
                              </p>
                            </div>

                            {exp.certificateUrl && (
                              <div className="ex-actions">
                                <button
                                  className={`ex-action-btn ${isDark ? "dark-mode" : ""}`}
                                  onClick={() => window.open(exp.certificateUrl, "_blank").focus()}
                                >
                                  <i className="fas fa-certificate"></i>
                                  <span>Certificate</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bullets - aligned with logo */}
                        {hasBullets && (
                          <div className="ex-bullets ex-bullets-open">
                            <div className="ex-bullets-container">
                              {exp.companylogo && (
                                <div className="ex-bullets-logo">
                                  <img
                                    src={exp.companylogo}
                                    alt={exp.company ? exp.company.replace(/(<([^>]+)>)/gi, "") : ""}
                                    crossOrigin="anonymous"
                                  />
                                </div>
                              )}
                              <div className="ex-bullets-content">
                                <ul>
                                  {exp.descBullets.map((bullet, bIdx) => (
                                    <li
                                      key={bIdx}
                                      className={isDark ? "dark-mode" : ""}
                                      style={{"--bullet-color": color}}
                                      dangerouslySetInnerHTML={{__html: bullet}}
                                    />
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Accent bar */}
                        <div
                          className="ex-accent"
                          style={{background: `linear-gradient(90deg, ${color}, ${color}60)`}}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
