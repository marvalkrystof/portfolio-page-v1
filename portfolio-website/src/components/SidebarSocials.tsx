import "../index.css";
import SocialIcon from "./SocialIcon";

import instagram_svg from "../assets/instagram.svg";
import linked_in_svg from "../assets/linkedin.svg";
import github_svg_white from "../assets/github-mark-white.svg";
import mail_svg from "../assets/mail.svg";

function SidebarSocials() {
  return (
    <>
      <div className="w-fit p-4 transition rounded flex flex-row flex-wrap justify-start items-center gap-5 mt-5 md:mt-10 hover:bg-content-background-hover duration-300">
        <SocialIcon
          filePath={github_svg_white}
          link="https://github.com/marvalkrystof"
        ></SocialIcon>
        <SocialIcon
          filePath={linked_in_svg}
          link="https://www.linkedin.com/in/krystofmarval/"
        ></SocialIcon>
        <SocialIcon
          filePath={instagram_svg}
          link="https://www.instagram.com/k_mrvl/"
        ></SocialIcon>
        <SocialIcon
          filePath={mail_svg}
          link="mailto:marval.krystof@seznam.cz"
        ></SocialIcon>
      </div>
    </>
  );
}

export default SidebarSocials;
