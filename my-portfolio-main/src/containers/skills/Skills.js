import React, {useContext} from "react";
import "./Skills.scss";
import {skillsSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }

  const skillCategories = [
    {
      id: "programming",
      title: "Programming",
      emoji: "💻",
      color: "#f59e0b",
      skills: ["Python", "MATLAB", "C/C++", "LaTeX"]
    },
    {
      id: "tools",
      title: "Tools & Frameworks",
      emoji: "🛠️",
      color: "#06b6d4",
      skills: [
        "PyTorch",
        "TensorFlow",
        "Keras",
        "Scikit-Learn",
        "Huggingface Transformers"
      ]
    },
    {
      id: "devops",
      title: "Software & DevOps",
      emoji: "🚀",
      color: "#10b981",
      skills: [
        "Simulink",
        "Proteus",
        "AutoCAD",
        "FastAPI",
        "Docker",
        "Git",
        "LangGraph",
        "CrewAI"
      ]
    },
    {
      id: "aiml",
      title: "AI/ML",
      emoji: "🧠",
      color: "#8b5cf6",
      skills: [
        "Supervised & Unsupervised Learning",
        "Deep Learning (Neural Networks, Transformers)",
        "NLP, LLM, Multimodal LLM",
        "RAG, Generative Models (GAN)"
      ]
    },
    {
      id: "cv",
      title: "Computer Vision",
      emoji: "👁️",
      color: "#ec4899",
      skills: [
        "Image Segmentation",
        "Object Detection",
        "Digital Image Processing",
        "OCR",
        "Vision Language Model (VLM)"
      ]
    },
    {
      id: "hardware",
      title: "Hardware",
      emoji: "🛰️",
      color: "#f97316",
      skills: ["Arduino", "IoT"]
    }
  ];

  // Software skill icons from portfolio.js
  const softwareSkills = skillsSection.softwareSkills || [];

  return (
    <div id="skills" className={isDark ? "dark-mode" : ""}>
      <div className="sk-main">
        {/* Header */}
        <div className="sk-header">
          <h1 className="skills-heading">Technical Skills</h1>
          <p className={`sk-subtitle ${isDark ? "dark-mode" : ""}`}>
            A comprehensive skill set spanning AI/ML, Computer Vision,
            Software Development, and Hardware Engineering.
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
            <div
              key={idx}
              className={`sk-cat ${isDark ? "dark-mode" : ""}`}
            >
              <div className="sk-cat-head">
                <span className="sk-cat-emoji">{cat.emoji}</span>
                <h3 className={`sk-cat-title ${isDark ? "dark-mode" : ""}`}>
                  {cat.title}
                </h3>
              </div>
              <div
                className="sk-cat-divider"
                style={{background: `linear-gradient(90deg, ${cat.color}60, transparent)`}}
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
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
