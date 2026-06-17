import React, {useRef, useEffect, useContext} from "react";
import "./PhotonicsBackground.scss";
import StyleContext from "../../contexts/StyleContext";

const PhotonicsBackground = () => {
  const canvasRef = useRef(null);
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init sizes

    // --- Configurations ---
    const photonCount = width < 768 ? 15 : 25; // Significantly reduced
    const waveCount = 2; // Very subtle interference
    const rayCount = 2; // Just a couple of slow sweeping lasers

    // Colors mapping based on theme
    const colors = {
      light: {
        photon: ["rgba(6, 182, 212, ", "rgba(59, 130, 246, ", "rgba(245, 158, 11, ", "rgba(239, 68, 68, "], 
        wave: "rgba(59, 130, 246, ",
        ray: "rgba(6, 182, 212, "
      },
      dark: {
        photon: ["rgba(34, 211, 238, ", "rgba(96, 165, 250, ", "rgba(251, 191, 36, ", "rgba(248, 113, 113, "],
        wave: "rgba(99, 102, 241, ",
        ray: "rgba(34, 211, 238, "
      }
    };

    // --- Entity Classes ---

    class Photon {
      constructor() {
        this.reset(true);
      }
      reset(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5; // Smaller
        this.speedY = -(Math.random() * 0.3 + 0.1); // Much slower
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.4 + 0.1; // Softer opacity
        this.themeColors = isDark ? colors.dark.photon : colors.light.photon;
        this.colorBase = this.themeColors[Math.floor(Math.random() * this.themeColors.length)];
        
        // Slight pulsing effect
        this.pulseSeed = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulseSeed += this.pulseSpeed;
        
        if (this.y < -50 || this.x < -50 || this.x > width + 50) {
          this.reset();
        }
      }
      draw(ctx) {
        const currentOpacity = this.opacity + Math.sin(this.pulseSeed) * 0.15;
        const color = `${this.colorBase}${Math.max(0, currentOpacity)})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${Math.max(0, currentOpacity * 0.15)})`;
        ctx.fill();
      }
    }

    class Wave {
      constructor(index) {
        this.index = index;
        this.seed = Math.random() * 1000;
        this.speed = Math.random() * 0.003 + 0.001; // Slower wave
        this.frequency = Math.random() * 0.002 + 0.001;
        this.amplitude = Math.random() * 40 + 20; // Softer waves
        this.offsetY = (height / waveCount) * index + (height / waveCount) / 2;
        
        this.isVertical = index % 2 !== 0; // 1 horizontal, 1 vertical
        if(this.isVertical) {
          this.offsetX = (width / waveCount) * index + (width / waveCount) / 2;
        }
      }
      update() {
        this.seed += this.speed;
        this.offsetY = (height / waveCount) * this.index + (height / waveCount) / 2;
        if(this.isVertical) {
          this.offsetX = (width / waveCount) * this.index + (width / waveCount) / 2;
        }
      }
      draw(ctx) {
        ctx.beginPath();
        if (this.isVertical) {
           for (let y = 0; y < height; y += 10) {
             const x = this.offsetX + Math.sin(y * this.frequency + this.seed) * this.amplitude;
             if (y === 0) ctx.moveTo(x, y);
             else ctx.lineTo(x, y);
           }
        } else {
           for (let x = 0; x < width; x += 10) {
             const y = this.offsetY + Math.sin(x * this.frequency + this.seed) * this.amplitude;
             if (x === 0) ctx.moveTo(x, y);
             else ctx.lineTo(x, y);
           }
        }
        
        const baseColor = isDark ? colors.dark.wave : colors.light.wave;
        ctx.strokeStyle = `${baseColor}0.08)`; // More subtle
        ctx.lineWidth = isDark ? 1.5 : 1;
        ctx.stroke();
      }
    }

    class LightRay {
      constructor() {
        this.reset(true);
      }
      reset(randomProgress = false) {
        this.progress = randomProgress ? Math.random() : -0.2; 
        this.speed = Math.random() * 0.0008 + 0.0003; // Slower rays
        this.angle = (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4 + (Math.random() - 0.5) * 0.5); 
        this.width = Math.random() * 150 + 50;
        this.opacity = Math.random() * 0.04 + 0.01; // Softer rays
      }
      update() {
        this.progress += this.speed;
        if (this.progress > 1.2) {
          this.reset();
        }
      }
      draw(ctx) {
        ctx.save();
        
        const cx = this.progress * (width + height);
        const cy = height / 2; 
        
        ctx.translate(cx, cy);
        ctx.rotate(this.angle);

        const baseColor = isDark ? colors.dark.ray : colors.light.ray;
        
        const gradient = ctx.createLinearGradient(-this.width/2, 0, this.width/2, 0);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, `${baseColor}${this.opacity})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(-this.width/2, -height * 2, this.width, height * 4);
        
        ctx.restore();
      }
    }

    // --- Initialization ---
    
    let photons = [];
    let waves = [];
    let rays = [];

    const initEntities = () => {
      photons = Array.from({length: photonCount}, () => new Photon());
      waves = Array.from({length: waveCount}, (_, i) => new Wave(i));
      rays = Array.from({length: rayCount}, () => new LightRay());
    };

    initEntities();

    // --- Animation Loop ---

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw waves first (background)
      waves.forEach(w => {
        w.update();
        w.draw(ctx);
      });

      // Draw rays
      // Use "screen" or "lighter" for cool light effect, but "source-over" is safer for cross-browser
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      rays.forEach(r => {
        r.update();
        r.draw(ctx);
      });
      ctx.globalCompositeOperation = "source-over";

      // Draw photons
      photons.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`photonics-container ${isDark ? "dark" : ""}`}>
      <canvas ref={canvasRef} className="photonics-canvas" />
      <div className="photonics-overlay"></div>
    </div>
  );
};

export default PhotonicsBackground;
