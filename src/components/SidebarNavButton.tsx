import type { SectionId } from "../data/navigation";

interface NavButtonProps {
  text: string;
  sectionId: SectionId;
  active: boolean;
}

export default function SidebarNavButton({ text, sectionId, active }: NavButtonProps) {
  return (
    <a className={`section-link${active ? " is-active" : ""}`} href={`#${sectionId}`} aria-current={active ? "location" : undefined}>
      <span className="nav-marker" aria-hidden="true" />
      {text}
    </a>
  );
}
