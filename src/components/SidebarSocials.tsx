import SocialIcon from "./SocialIcon";
import instagramIcon from "../assets/instagram.svg";
import linkedInIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github-mark-white.svg";

export default function SidebarSocials() {
  return (
    <div className="sidebar-socials">
      <SocialIcon filePath={githubIcon} link="https://github.com/marvalkrystof" label="GitHub (opens in a new tab)" />
      <SocialIcon filePath={linkedInIcon} link="https://www.linkedin.com/in/krystofmarval/" label="LinkedIn (opens in a new tab)" />
      <SocialIcon filePath={instagramIcon} link="https://www.instagram.com/k_mrvl/" label="Instagram (opens in a new tab)" />
    </div>
  );
}
