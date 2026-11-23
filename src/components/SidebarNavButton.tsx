import type { MouseEvent } from "react";
import type { SectionId } from "../data/navigation";

interface NavButtonProps {
  text: string;
  sectionId: SectionId;
  active: boolean;
}

export default function SidebarNavButton({ text, sectionId, active }: NavButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, "", `#${sectionId}`);
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <a
      className={`section-link${active ? " is-active" : ""}`}
      href={`#${sectionId}`}
      aria-current={active ? "location" : undefined}
      onClick={handleClick}
    >
      <span className="nav-marker" aria-hidden="true" />
      {text}
    </a>
  );
}
