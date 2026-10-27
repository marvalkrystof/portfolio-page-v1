import { useEffect, useState } from "react";
import { sections, type SectionId } from "../data/navigation";

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Leave room below the 96px anchor offset, including subpixel rounding.
      const readingLine = 112;
      let current: SectionId = "about";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      // Short final sections must also be reachable by the active indicator.
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = "certifications";
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.getElementById("main-content");
    if (main) observer.observe(main);
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return activeSection;
}
