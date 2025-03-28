import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#0f172a",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: ["#60a5fa", "#a78bfa", "#34d399"],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1.5,
            triangles: {
              enable: true,
              opacity: 0.1,
            },
          },
          collisions: {
            enable: true,
          },
          move: {
            enable: true,
            direction: "none",
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.5,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
            random: {
              enable: true,
              minimumValue: 0.3,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },
          shape: {
            type: ["circle", "triangle"],
          },
          size: {
            value: { min: 2, max: 4 },
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 1,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
