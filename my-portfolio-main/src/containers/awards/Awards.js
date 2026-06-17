import React, {useContext} from "react";
import "./Awards.scss";
import {awardsSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Awards() {
  const {isDark} = useContext(StyleContext);
  if (!awardsSection.display) {
    return null;
  }

  return (
    <div className="main" id="awards">
      <div className="awards-main-div">
        <Fade bottom duration={1000} distance="20px">
          <div className="awards-header">
            <h1 className={isDark ? "skills-heading dark-mode-text" : "skills-heading"}>
              {awardsSection.title}
            </h1>
            <p className={isDark ? "awards-subtitle dark-mode-subtitle" : "awards-subtitle"}>
              {awardsSection.subtitle}
            </p>
          </div>
        </Fade>
        
        <div className="awards-container">
          {awardsSection.awards.map((award, index) => (
            <Fade bottom duration={1000} distance="20px" key={index}>
              <div className={isDark ? "award-card dark-mode-card" : "award-card"}>
                <div className="award-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="award-content">
                  <h3 className={isDark ? "award-title dark-mode-text" : "award-title"}>
                    {award.title}
                  </h3>
                  <h4 className={isDark ? "award-org dark-mode-subtitle" : "award-org"}>
                    {award.organization}
                  </h4>
                  <div className="award-divider"></div>
                  <p className={isDark ? "award-desc dark-mode-desc" : "award-desc"}>
                    {award.description}
                  </p>
                  {award.certificateUrl && (
                    <div className="award-footer">
                      <a
                        href={award.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="award-certificate-button"
                      >
                        Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
}
