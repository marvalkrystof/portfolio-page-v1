import { useEffect, useRef } from "react";
import SidebarNavButton from "./SidebarNavButton";
import { sections, type SectionId } from "../data/navigation";

interface SidebarNavProps {
  activeSection: SectionId;
  mobile?: boolean;
}

export default function SidebarNav({ activeSection, mobile = false }: SidebarNavProps) {
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobile || !linksRef.current) return;
    const links = linksRef.current;
    const active = links.querySelector('[aria-current="location"]');
    if (!active) return;
    const container = links.getBoundingClientRect();
    const link = active.getBoundingClientRect();
    // Only move this horizontal scroller; never change the page's scroll position.
    if (link.left < container.left) links.scrollLeft += link.left - container.left - 4;
    else if (link.right > container.right) links.scrollLeft += link.right - container.right + 4;
  }, [activeSection, mobile]);

  return (
    <nav className={mobile ? "mobile-nav" : "sidebar-nav"} aria-label="Page sections">
      <div className="nav-links" ref={linksRef}>
        {sections.map(({ id, label }) => (
          <SidebarNavButton key={id} text={label} sectionId={id} active={activeSection === id} />
        ))}
      </div>
    </nav>
  );
}
