import TechnologyList from "./TechnologyList";
import type { WorkExperience, CertificationExperience } from "../types/content";

type Experience = WorkExperience | CertificationExperience;

export default function ExperienceCard(props: Experience) {
  const isWork = "position_name" in props;
  const title = isWork ? props.position_name : props.certification_name;
  const date = isWork ? `${props.start_date} — ${props.end_date === "NOW" ? "PRESENT" : props.end_date}` : props.date;
  return (
    <article className="experience-card">
      <p className="entry-date">{date}</p>
      <h3>{title}</h3>
      <p className="entry-institution">{props.institution_name}</p>
      <p className="entry-description">{props.description}</p>
      <TechnologyList technologies={props.technologies} label={`${title} at ${props.institution_name}`} />
    </article>
  );
}
