import "../index.css";
import SidebarNavButton from "./SidebarNavButton";
import { ContentProps } from "./Content";

function SidebarNav({ refs }: ContentProps) {
  return (
    <>
      <nav className="hidden md:flex md:w-20 md:h-100 md:flex-col md:flex-wrap md:pt-4">
        <SidebarNavButton text="About" targetElement={refs.about} />
        <SidebarNavButton text="Experience" targetElement={refs.experience} />
        <SidebarNavButton text="Education" targetElement={refs.education} />
        <SidebarNavButton text="Projects" targetElement={refs.projects} />
        <SidebarNavButton
          text="Certifications"
          targetElement={refs.certifications}
        />
      </nav>
    </>
  );
}

export default SidebarNav;
