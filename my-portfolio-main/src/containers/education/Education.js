import React, {useContext} from "react";
import "./Education.scss";
import {educationInfo} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Education() {
  const {isDark} = useContext(StyleContext);

  if (!educationInfo.display) {
    return null;
  }

  return (
    <div className="ed-main" id="education">
      <div className={`ed-container ${isDark ? "dark-mode" : ""}`}>
        {/* Header */}
        <div className="ed-header">
          <h1 className="skills-heading">Education</h1>
        </div>

        {/* Education Cards */}
        <div className="ed-cards">
          {educationInfo.schools.map((school, index) => (
            <div
              key={index}
              className={`ed-card ${isDark ? "dark-mode" : ""}`}
            >
              {/* Logo Column */}
              <div className="ed-logo-col">
                {school.logo && (
                  <div className="ed-logo">
                    {school.schoolUrl ? (
                      <a
                        href={school.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={school.logo}
                          alt={school.schoolName}
                          crossOrigin="anonymous"
                        />
                      </a>
                    ) : (
                      <img
                        src={school.logo}
                        alt={school.schoolName}
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                )}
                

                
                {/* Result, EQF and Credits */}
                {(school.finalGrade || school.eqfLevel || school.numberCredits || school.ects) && (
                  <div className={`ed-stats ${isDark ? "dark-mode" : ""}`}>
                    {school.finalGrade && (
                      <div className="ed-stat-item">
                        <span className="ed-stat-label">Final grade: </span>
                        <span className="ed-stat-value">{school.finalGrade}</span>
                      </div>
                    )}
                    {school.eqfLevel && (
                      <div className="ed-stat-item">
                        <span className="ed-stat-label">Level in EQF: </span>
                        <span className="ed-stat-value">{school.eqfLevel}</span>
                      </div>
                    )}
                    {school.numberCredits && (
                      <div className="ed-stat-item">
                        <span className="ed-stat-label">Number of credits: </span>
                        <span className="ed-stat-value">{school.numberCredits}</span>
                      </div>
                    )}
                    {school.ects && (
                      <div className="ed-stat-item">
                        <span className="ed-stat-label">Total ECTS: </span>
                        <span className="ed-stat-value">{school.ects}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="ed-info">
                <div className="ed-info-top">
                  <h3 className={`ed-school ${isDark ? "dark-mode" : ""}`}>
                    {school.schoolUrl ? (
                      <a
                        href={school.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {school.schoolName}
                      </a>
                    ) : (
                      school.schoolName
                    )}
                  </h3>
                  <span className={`ed-duration ${isDark ? "dark-mode" : ""}`}>
                    {school.duration}
                  </span>
                </div>

                <h4 className="ed-degree">
                  {school.subHeader}
                </h4>

                {school.desc && (
                  <p className={`ed-desc ${isDark ? "dark-mode" : ""}`}>
                    {school.desc}
                  </p>
                )}

                {school.descBullets && school.descBullets.length > 0 && (
                  <ul className={`ed-bullets ${isDark ? "dark-mode" : ""}`}>
                    {school.descBullets.map((bullet, i) => (
                      <li key={i} dangerouslySetInnerHTML={{__html: bullet}} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
