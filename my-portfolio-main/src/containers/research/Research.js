import React, {useState, useContext} from "react";
import "./Research.scss";
import {researchSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Research() {
  const {isDark} = useContext(StyleContext);
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleAbstract = id => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  function openUrlInNewTab(url) {
    if (!url) return;
    window.open(url, "_blank").focus();
  }

  if (!researchSection.display) {
    return null;
  }

  // Icon + color map for interests
  const getInterestMeta = (interest) => {
    const i = interest.toLowerCase();
    if (i.includes("healthcare")) return {icon: "fas fa-heartbeat", color: "#E91E63"};
    if (i.includes("renewable")) return {icon: "fas fa-solar-panel", color: "#4CAF50"};
    if (i.includes("vision")) return {icon: "fas fa-eye", color: "#3F51B5"};
    if (i.includes("natural language")) return {icon: "fas fa-brain", color: "#9C27B0"};
    if (i.includes("rf systems")) return {icon: "fas fa-broadcast-tower", color: "#00BCD4"};
    return {icon: "fas fa-microscope", color: "#607D8B"};
  };

  return (
    <div className="rs-main" id="research">
      <div className={`rs-container ${isDark ? "dark-mode" : ""}`}>
        {/* Header */}
        <div className="rs-header">
          <h1 className="skills-heading">{researchSection.title}</h1>
        </div>

        {/* Research Interests */}
        <div className={`rs-interests ${isDark ? "dark-mode" : ""}`}>
          <h2 className={`rs-interests-title ${isDark ? "dark-mode" : ""}`}>
            {researchSection.subtitle}
          </h2>
          <div className="rs-interests-tags">
            {researchSection.interests.map((interest, i) => {
              const meta = getInterestMeta(interest);
              return (
                <span
                  key={i}
                  className={`rs-interest-tag ${isDark ? "dark-mode" : ""}`}
                  style={{"--tag-accent": meta.color}}
                >
                  <i className={meta.icon} style={{color: meta.color}}></i>
                  {interest}
                </span>
              );
            })}
          </div>
        </div>

        {/* Publications */}
        <div className="rs-sections">
          {researchSection.sections.map((section, sidx) => (
            <div key={sidx} className="rs-section">
              {/* Section Header */}
              <div className="rs-section-head">
                <div className="rs-section-dot"></div>
                <h2 className={`rs-section-title ${isDark ? "dark-mode" : ""}`}>
                  {section.title}
                </h2>
                <span className="rs-section-count">{section.projects.length}</span>
                <div className="rs-section-line"></div>
              </div>

              {/* Publication Items */}
              <div className="rs-pubs">
                {section.projects.map((project, pidx) => {
                  const projectId = `${sidx}-${pidx}`;
                  const isExpanded = expandedProject === projectId;

                  return (
                    <div
                      key={pidx}
                      className={`rs-pub ${isExpanded ? "rs-pub-open" : ""} ${isDark ? "dark-mode" : ""}`}
                    >
                      {/* Publication Row */}
                      <div className="rs-pub-row">
                        <div className="rs-pub-info">
                          {/* Title line */}
                          <div className="rs-pub-title-line">
                            {project.isThesis && (
                              <span className="rs-thesis-badge">THESIS</span>
                            )}
                            <h3
                              className={`rs-pub-title ${isDark ? "dark-mode" : ""}`}
                              onClick={() =>
                                project.footerLink &&
                                openUrlInNewTab(project.footerLink[0]?.url)
                              }
                              style={{cursor: project.footerLink ? "pointer" : "default"}}
                            >
                              {project.projectName}
                            </h3>
                          </div>

                          {/* Venue */}
                          {project.publishedAt && (
                            <div className="rs-pub-venue">
                              {project.venueLogo ? (
                                <img
                                  src={project.venueLogo}
                                  alt="Venue"
                                  className={`rs-venue-logo ${isDark ? "dark-mode" : ""}`}
                                />
                              ) : (
                                <i
                                  className={`fas ${
                                    project.isThesis
                                      ? "fa-graduation-cap"
                                      : project.publishedAt?.includes("Working")
                                      ? "fa-microscope"
                                      : "fa-university"
                                  } rs-venue-icon`}
                                ></i>
                              )}
                              <span
                                className="rs-venue-text"
                                onClick={() =>
                                  project.venueLink &&
                                  openUrlInNewTab(project.venueLink)
                                }
                                style={{cursor: project.venueLink ? "pointer" : "default"}}
                              >
                                {project.publishedAt}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="rs-pub-actions">
                          <button
                            className={`rs-action-btn ${isExpanded ? "rs-action-active" : ""} ${isDark ? "dark-mode" : ""}`}
                            onClick={() => toggleAbstract(projectId)}
                          >
                            <i className={`fas ${isExpanded ? "fa-chevron-up" : "fa-align-left"}`}></i>
                            <span>
                              {isExpanded
                                ? project.isOverview ? "Hide" : "Hide"
                                : project.isOverview ? "Overview" : "Abstract"}
                            </span>
                          </button>

                          {project.footerLink?.map((link, lid) => (
                            <button
                              key={lid}
                              className={`rs-action-btn rs-action-link ${isDark ? "dark-mode" : ""}`}
                              onClick={() => openUrlInNewTab(link.url)}
                            >
                              <i
                                className={
                                  link.name.toLowerCase().includes("pdf")
                                    ? "fas fa-file-pdf"
                                    : link.name.toLowerCase().includes("view")
                                    ? "fas fa-external-link-alt"
                                    : link.name.toLowerCase().includes("github")
                                    ? "fab fa-github"
                                    : "fas fa-link"
                                }
                              ></i>
                              <span>{link.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Abstract */}
                      <div className={`rs-abstract ${isExpanded ? "rs-abstract-open" : ""}`}>
                        <p className={`rs-abstract-text ${isDark ? "dark-mode" : ""}`}>
                          {project.projectDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
