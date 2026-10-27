import SidebarNav from "./SidebarNav";
import SidebarSocials from "./SidebarSocials";
import type { SectionId } from "../data/navigation";

export default function Sidebar({ activeSection }: { activeSection: SectionId }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-intro">
        <p className="eyebrow">Prague, Czech Republic</p>
        <h1>Kryštof Marval<span className="name-period">.</span></h1>
        <p className="sidebar-role">Software Developer</p>
        <p className="sidebar-summary">Building software for research, data, and the things I’m curious about.</p>
        <div className="intro-actions">
          <a className="button button-primary" href="https://marvalkrystof.github.io/CV/" target="_blank" rel="noopener noreferrer">
            View CV <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="button button-secondary" href="mailto:marval.krystof@seznam.cz">Email me <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <SidebarNav activeSection={activeSection} />
      <SidebarSocials />
    </aside>
  );
}
