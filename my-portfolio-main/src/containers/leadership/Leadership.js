import React, {useContext} from "react";
import "./Leadership.scss";
import {leadershipSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Leadership() {
  const {isDark} = useContext(StyleContext);
  if (!leadershipSection.display) {
    return null;
  }

  return (
    <div className="main" id="leadership">
      <div className="leadership-main-div">
        <Fade bottom duration={1000} distance="20px">
          <div className="leadership-header">
            <h1 className={isDark ? "leadership-heading dark-mode-text" : "leadership-heading"}>
              {leadershipSection.title}
            </h1>
            <p className={isDark ? "leadership-subtitle dark-mode-subtitle" : "leadership-subtitle"}>
              {leadershipSection.subtitle}
            </p>
          </div>
        </Fade>
        
        <div className="leadership-container">
          {leadershipSection.items.map((item, index) => (
            <Fade bottom duration={1000} distance="20px" key={index}>
              <div className={isDark ? "leadership-card dark-mode-leadership-card" : "leadership-card"}>
                <div className="leadership-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="leadership-content">
                  <h3 className={isDark ? "leadership-role dark-mode-text" : "leadership-role"}>
                    {item.role}
                  </h3>
                  <h4 className={isDark ? "leadership-org dark-mode-subtitle" : "leadership-org"}>
                    {item.organization} {item.orgDetails && <span>{item.orgDetails}</span>}
                  </h4>
                  <p className={isDark ? "leadership-duration dark-mode-text" : "leadership-duration"}>
                    {item.duration}
                  </p>
                  <div className="leadership-divider"></div>
                  <p className={isDark ? "leadership-desc dark-mode-desc" : "leadership-desc"}>
                    {item.description}
                  </p>
                  {item.certificateUrl && (
                    <div className="leadership-footer">
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="leadership-certificate-button"
                      >
                        View Credential
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
