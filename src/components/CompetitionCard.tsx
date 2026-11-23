import TechnologyList from "./TechnologyList";
import type { CompetitionExperience } from "../types/content";

export default function CompetitionCard({ competition }: { competition: CompetitionExperience }) {
  return (
    <article className="experience-card">
      <p className="entry-date">{competition.date}</p>
      <h3>
        {competition.placement} —{" "}
        <a className="project-title" href={competition.project_link} target="_blank" rel="noopener noreferrer">
          {competition.project_name}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </h3>
      <p className="entry-institution">
        <a className="competition-event-link" href={competition.event_link} target="_blank" rel="noopener noreferrer">
          {competition.competition_name}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
        <span> · {competition.organizer}</span>
      </p>
      <p className="entry-description">{competition.description}</p>
      <TechnologyList technologies={competition.technologies} label={`${competition.project_name} at ${competition.competition_name}`} />
    </article>
  );
}
