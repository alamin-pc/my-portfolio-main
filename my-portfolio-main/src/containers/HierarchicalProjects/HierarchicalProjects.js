import React, {useContext, useEffect, useRef, useState} from "react";
import "./HierarchicalProjects.scss";
import {bigProjects} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function HierarchicalProjects() {
  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    const finalUrl = url.startsWith("/")
      ? `${process.env.PUBLIC_URL}${url}`
      : url;
    var win = window.open(finalUrl, "_blank");
    if (win) {
      win.focus();
    }
  }

  const {isDark} = useContext(StyleContext);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    const node = sectionRef.current;
    if (!node) {
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            clearTimeout(fallbackTimer);
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.05, rootMargin: "0px 0px 100px 0px"}
    );

    observer.observe(node);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  if (!bigProjects.display || !bigProjects.categories) {
    return null;
  }

  const toggleExpand = (key) => {
    setExpandedProject(expandedProject === key ? null : key);
  };

  return (
    <div
      ref={sectionRef}
      className={`hierarchical-fade-wrapper ${isVisible ? "hierarchical-fade-visible" : ""}`}
    >
      <div className="main hp-main" id="projects">
        <div className="hp-inner">
          {/* Section Header */}
          <div className="hp-header">
            <h1 className="skills-heading project-title-center">
              {bigProjects.title}
            </h1>
            <p className={isDark ? "dark-mode hp-subtitle" : "hp-subtitle"}>
              {bigProjects.subtitle}
            </p>
          </div>

          {/* All Categories */}
          <div className="hp-all-categories">
            {bigProjects.categories.map((category, catIdx) => (
              <div
                key={catIdx}
                className={`hp-cat-block ${isDark ? "dark-mode" : ""}`}
              >
                {/* Category Header */}
                <div className="hp-cat-header">
                  <div className="hp-cat-icon-wrap" style={{background: `${category.style?.color || '#3b82f6'}15`}}>
                    <i
                      className={category.categoryIcon}
                      style={{color: category.style?.color || '#3b82f6'}}
                    ></i>
                  </div>
                  <h2 className={`hp-cat-name ${isDark ? "dark-mode" : ""}`}>
                    {category.categoryName}
                  </h2>
                  <span className="hp-cat-count">{category.projects.length}</span>
                  <div className="hp-cat-line" style={{background: `linear-gradient(90deg, ${category.style?.color || '#3b82f6'}30, transparent)`}}></div>
                </div>

                {/* Projects */}
                <div className="hp-cat-projects">
                  {category.projects.map((project, projIdx) => {
                    const key = `${catIdx}-${projIdx}`;
                    const isExpanded = expandedProject === key;
                    return (
                      <div
                        key={projIdx}
                        className={`hp-row ${isExpanded ? "hp-row-expanded" : ""} ${isDark ? "dark-mode" : ""}`}
                      >
                        {/* Main row */}
                        <div
                          className="hp-row-main"
                          onClick={() => toggleExpand(key)}
                        >
                          <div className="hp-row-left">
                            <span
                              className="hp-row-dot"
                              style={{background: category.style?.color || '#3b82f6'}}
                            ></span>
                            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                              {(() => {
                                const match = project.projectName.match(/^(.*)\(([^)]+)\)$/);
                                const titleText = match ? match[1].trim() : project.projectName;
                                const dateText = match ? match[2].trim() : null;

                                return (
                                  <h3 className={`hp-row-title ${isDark ? "dark-mode" : ""}`} style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", gap: "20px" }}>
                                    <span className="hp-title-text">{titleText}</span>
                                    {dateText && (
                                      <span className="hp-project-date" style={{ fontWeight: "normal", fontSize: "0.85em", opacity: 0.7, whiteSpace: "nowrap" }}>
                                        {dateText}
                                      </span>
                                    )}
                                  </h3>
                                );
                              })()}
                              {project.projectSubtitle && (
                                <span className={`hp-row-subtitle ${isDark ? "dark-mode" : ""}`} style={{ fontSize: "12px", opacity: 0.6, marginTop: "2px", fontFamily: "Inter, sans-serif" }}>
                                  {project.projectSubtitle}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="hp-row-right" onClick={(e) => e.stopPropagation()}>
                            {project.footerLink &&
                              project.footerLink.map((link, linkIdx) => {
                                const ln = link.name.toLowerCase();
                                let icon = "fas fa-link";
                                let type = "default";
                                if (ln.includes("github")) { icon = "fab fa-github"; type = "github"; }
                                else if (ln.includes("live")) { icon = "fas fa-globe"; type = "live"; }
                                else if (ln.includes("report") || ln.includes("book") || ln.includes("paper")) { icon = "fas fa-file-alt"; type = "report"; }
                                else if (ln.includes("pdf")) { icon = "fas fa-file-pdf"; type = "report"; }
                                return (
                                  <a
                                    key={linkIdx}
                                    className={`hp-pill hp-pill-${type} ${isDark ? "dark-mode" : ""}`}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openUrlInNewTab(link.url);
                                    }}
                                    title={link.name}
                                  >
                                    <i className={icon}></i>
                                    <span className="hp-pill-text">{link.name}</span>
                                  </a>
                                );
                              })}
                            <button
                              className={`hp-expand-btn ${isExpanded ? "hp-expand-open" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(key);
                              }}
                              title="Show description"
                            >
                              <i className="fas fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>

                        {/* Expandable description */}
                        <div className={`hp-row-desc ${isExpanded ? "hp-row-desc-open" : ""}`}>
                          <div className={`hp-desc-text ${isDark ? "dark-mode" : ""}`}>
                            {project.projectDesc.split("\n").map((line, i) => (
                              <p key={i} style={{ marginBottom: "4px", display: "flex", gap: "8px" }}>
                                {line.trim().startsWith("➤") || line.trim().startsWith("•") || line.trim().startsWith("🔹") || line.trim().startsWith(">") || line.trim().startsWith("-") ? (
                                  <span>{line.trim()}</span>
                                ) : (
                                  <>
                                    <span style={{ color: category.style?.color || '#3b82f6' }}>➤</span>
                                    <span>{line.trim()}</span>
                                  </>
                                )}
                              </p>
                            ))}
                          </div>
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
    </div>
  );
}
