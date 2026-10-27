import "./index.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

import { memo, useEffect, useMemo, useState } from "react";
import SidebarNav from "./components/SidebarNav";
import useActiveSection from "./hooks/useActiveSection";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// The library reloads its engine whenever its props object changes.
// Keep section-highlighting updates from re-rendering the particle component.
const ParticleBackground = memo(Particles);

const App = () => {
  const [init, setInit] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true)).catch((error) => {
      console.error("Unable to initialize particle background:", error);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#24014b",
        },
      },
      fpsLimit: 144,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 150,
          },
          repulse: {
            distance: 200,
            duration: 2,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },

        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "edge",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );
  return (
    <>
      {init && <ParticleBackground id="tsparticles" options={options} />}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="portfolio-layout">
        <Sidebar activeSection={activeSection} />
        <SidebarNav activeSection={activeSection} mobile />
        <Content />
      </div>
    </>
  );
};

export default App;
