import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import ParticlesBackground from "./components/ParticlesBackground";
import TechnicalBackground from "./components/TechnicalBackground";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trailerPositions, setTrailerPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [isInHeroSection, setIsInHeroSection] = useState(false);

  useEffect(() => {
    let trailingPositions: { x: number; y: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.getElementById("hero");
      const heroRect = heroSection?.getBoundingClientRect();
      const isInHero = heroRect
        ? e.clientY >= heroRect.top &&
          e.clientY <= heroRect.bottom &&
          e.clientX >= heroRect.left &&
          e.clientX <= heroRect.right
        : false;

      setIsInHeroSection(isInHero);

      if (!isInHero) {
        setCursorPosition({ x: e.clientX, y: e.clientY });

        // Update trailing positions
        trailingPositions.push({ x: e.clientX, y: e.clientY });
        if (trailingPositions.length > 5) {
          trailingPositions = trailingPositions.slice(-5);
        }
        setTrailerPositions([...trailingPositions]);
      }
    };

    const handleMouseOver = () => {
      setIsHovering(true);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Add hover-effect class to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"]'
    );
    interactiveElements.forEach((element) => {
      const heroSection = document.getElementById("hero");
      if (!heroSection?.contains(element)) {
        element.classList.add("hover-effect");
        element.addEventListener("mouseover", handleMouseOver as EventListener);
        element.addEventListener("mouseout", handleMouseOut as EventListener);
      }
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((element) => {
        const heroSection = document.getElementById("hero");
        if (!heroSection?.contains(element)) {
          element.classList.remove("hover-effect");
          element.removeEventListener(
            "mouseover",
            handleMouseOver as EventListener
          );
          element.removeEventListener(
            "mouseout",
            handleMouseOut as EventListener
          );
        }
      });
    };
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <ParticlesBackground />
      <TechnicalBackground />

      {/* Custom Cursor (only outside Hero section) */}
      {!isInHeroSection && (
        <>
          <div
            className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
            style={{
              transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
            }}
          >
            <div className="cursor-ring" />
            <div className="cursor-dot" />
          </div>

          {/* Trailing cursor effects */}
          {trailerPositions.map((pos, index) => (
            <div
              key={index}
              className="cursor-trailer"
              style={{
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%)`,
                opacity: ((index + 1) / trailerPositions.length) * 0.5,
              }}
            />
          ))}
        </>
      )}

      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
