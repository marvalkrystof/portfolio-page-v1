interface SocialIconProps {
  filePath: string;
  link: string;
  label: string;
}

export default function SocialIcon({ filePath, link, label }: SocialIconProps) {
  const external = link.startsWith("https://");
  return (
    <a className="social-link" href={link} aria-label={label} title={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      <img width="22" height="22" src={filePath} alt="" />
    </a>
  );
}
