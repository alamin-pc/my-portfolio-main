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
                            <h3 className={`hp-row-title ${isDark ? "dark-mode" : ""}`}>
                              {project.projectName}
                            </h3>
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
                          <p className={`hp-desc-text ${isDark ? "dark-mode" : ""}`}>
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

          {/* Footer */}
          <div className={`hp-footer ${isDark ? "dark-mode" : ""}`}>
            <p className={`hp-footer-text ${isDark ? "dark-mode" : ""}`}>
              Looking for more? Explore my GitHub portfolio for additional
              end-to-end AI projects across Machine Learning, Computer Vision,
              NLP, Deep Learning, and Generative AI.
            </p>
            <a
              href="https://github.com/rashedulalbab253"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-footer-btn"
            >
              <i className="fab fa-github"></i> Explore All Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
