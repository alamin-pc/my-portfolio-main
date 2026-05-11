import React, {useContext, useState, useEffect, useCallback} from "react";
import "./Greeting.scss";
import Button from "../../components/button/Button";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import {greeting, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

const ROLES = [
  {text: "Researcher", icon: "🔬"},
  {text: "AI Engineer", icon: "⚙️"},
  {text: "Educator", icon: "📚"},
  {text: "Research Assistant", icon: "🧪"}
];
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 2200;
const PAUSE_AFTER_DELETING = 500;

function useTypewriter(roles) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const tick = useCallback(() => {
    if (isWaiting) return;

    const currentWord = roles[roleIndex].text;

    if (!isDeleting) {
      const nextText = currentWord.substring(0, displayText.length + 1);
      setDisplayText(nextText);

      if (nextText.length === currentWord.length) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPING);
        return;
      }
    } else {
      const nextText = currentWord.substring(0, displayText.length - 1);
      setDisplayText(nextText);

      if (nextText.length === 0) {
        setIsDeleting(false);
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, PAUSE_AFTER_DELETING);
        return;
      }
    }
  }, [displayText, isDeleting, isWaiting, roleIndex, roles]);

  useEffect(() => {
    if (isWaiting) return;
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, isWaiting]);

  return {displayText, currentIcon: roles[roleIndex].icon, isDeleting};
}

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const {displayText, currentIcon} = useTypewriter(ROLES);

  if (!greeting.displayGreeting) {
    return null;
  }

  return (
    <div className="hero-main" id="greeting">
      <div className={`hero-container ${isDark ? "dark-mode" : ""}`}>
        {/* Left: Text content */}
        <div className="hero-text">
          {/* Status pill */}
          <div className={`hero-status ${isDark ? "dark-mode" : ""}`}>
            <span className="hero-status-dot"></span>
            <span>Looking for PhD Opportunities</span>
          </div>

          {/* Name */}
          <h1 className={`hero-name ${isDark ? "dark-mode" : ""}`}>
            <span className="hero-name-gradient">{greeting.username}</span>
          </h1>

          {/* Typewriter */}
          <div className={`hero-role ${isDark ? "dark-mode" : ""}`}>
            <span className="hero-role-icon" aria-hidden="true">
              {currentIcon}
            </span>
            <span className="hero-role-typewriter">
              <span className={`hero-role-text ${isDark ? "dark-mode" : ""}`}>{displayText}</span>
              <span className={`hero-cursor ${isDark ? "dark-mode" : ""}`} />
            </span>
          </div>

          {/* Bio paragraph */}
          <p
            className={`hero-bio ${isDark ? "dark-mode" : ""}`}
            dangerouslySetInnerHTML={{__html: greeting.subTitle}}
          />

          {/* Buttons */}
          <div className="hero-actions">
            <Button text="Contact me" href="#contact" />
            {greeting.resumeLink && (
              <a
                href={`${process.env.PUBLIC_URL}/cv_of_alamin_chy.pdf`}
                download="cv_of_alamin_chy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="main-button"
              >
                Download my CV
              </a>
            )}
          </div>

          {/* Social links inline */}
          {socialMediaLinks.display && (
            <div className="hero-socials">
              <SocialMedia />
            </div>
          )}
        </div>

        {/* Right: Photo */}
        <div className="hero-image">
          <div className="hero-photo-wrap">
            <img
              alt={greeting.username}
              src="/Rashed-removebg.png"
              className="hero-photo"
            />
            <div className="hero-photo-ring"></div>
            <div className="hero-photo-glow"></div>
            <div className="hero-float-circle hero-fc-1"></div>
            <div className="hero-float-circle hero-fc-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
