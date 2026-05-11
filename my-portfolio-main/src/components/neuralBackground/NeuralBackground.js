import React, {useRef, useEffect, useContext} from "react";
import "./NeuralBackground.scss";
import StyleContext from "../../contexts/StyleContext";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // Perspective Grid Configuration
    const vanishX = width * 0.5;
    const vanishY = height * 0.38;
    const horizonLines = isMobile ? 20 : 35;
    const verticalLines = isMobile ? 14 : 24;
    const pulseCount = isMobile ? 8 : 18;

    let pulses = [];
    let time = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Data pulses that travel along the grid lines
    class DataPulse {
      constructor() {
        this.init();
      }

      init() {
        this.isVertical = Math.random() > 0.5;
        this.progress = 0;
        this.speed = Math.random() * 0.004 + 0.001;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.6 + 0.3;

        if (this.isVertical) {
          this.lineIndex = Math.floor(Math.random() * verticalLines);
        } else {
          this.lineIndex = Math.floor(Math.random() * horizonLines);
        }

        this.delay = Math.random() * 300;
      }

      update() {
        if (this.delay > 0) {
          this.delay--;
          return;
        }
        this.progress += this.speed;
        if (this.progress > 1) this.init();
      }

      getPosition() {
        const t = this.progress;

        if (this.isVertical) {
          const spreadAngle =
            (this.lineIndex / verticalLines - 0.5) * Math.PI * 0.8;
          const dist = t * height * 0.8;
          const x = vanishX + Math.sin(spreadAngle) * dist;
          const y = vanishY + Math.cos(spreadAngle) * dist * 0.6;
          return {x, y, scale: t};
        } else {
          const depth = this.lineIndex / horizonLines;
          const yPos = vanishY + depth * (height - vanishY);
          const spread = depth * width * 0.8;
          const xPos = vanishX - spread + t * spread * 2;
          return {x: xPos, y: yPos, scale: depth};
        }
      }

      draw() {
        if (this.delay > 0) return;
        const pos = this.getPosition();
        const s = Math.max(0.3, pos.scale);
        const alpha = this.opacity * s;

        // Glowing pulse
        const gradient = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          this.size * 4 * s
        );
        gradient.addColorStop(
          0,
          isDark
            ? `rgba(99, 102, 241, ${alpha})`
            : `rgba(59, 130, 246, ${alpha * 0.6})`
        );
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.size * 4 * s, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = isDark
          ? `rgba(165, 180, 252, ${alpha * 1.2})`
          : `rgba(59, 130, 246, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.size * s * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initPulses = () => {
      pulses = [];
      for (let i = 0; i < pulseCount; i++) {
        pulses.push(new DataPulse());
      }
    };

    const drawPerspectiveGrid = () => {
      const breathe = Math.sin(time * 0.3) * 0.005 + 0.04;

      // Vertical perspective lines radiating from vanish point
      for (let i = 0; i < verticalLines; i++) {
        const t = i / (verticalLines - 1) - 0.5;
        const angle = t * Math.PI * 0.8;
        const endX = vanishX + Math.sin(angle) * width;
        const endY = vanishY + Math.cos(angle) * height;

        ctx.strokeStyle = isDark
          ? `rgba(99, 102, 241, ${breathe})`
          : `rgba(30, 41, 59, ${breathe * 0.7})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Horizontal depth lines (closer = more opaque)
      for (let i = 1; i <= horizonLines; i++) {
        const depth = i / horizonLines;
        const y = vanishY + depth * (height - vanishY);
        const spread = depth * width * 0.8;
        const opacity = depth * breathe * 1.5;

        ctx.strokeStyle = isDark
          ? `rgba(99, 102, 241, ${opacity})`
          : `rgba(30, 41, 59, ${opacity * 0.7})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(vanishX - spread, y);
        ctx.lineTo(vanishX + spread, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      drawPerspectiveGrid();

      pulses.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.width = width;
    canvas.height = height;
    window.addEventListener("resize", handleResize);
    initPulses();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`tensor-container ${isDark ? "dark" : "light"}`}>
      <canvas ref={canvasRef} className="tensor-canvas" />
      <div className="tensor-overlay"></div>
    </div>
  );
};

export default NeuralBackground;
