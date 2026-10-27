import { useId, useState } from "react";
import ExperienceAbility from "./ExperienceAbility";

export default function TechnologyList({ technologies, label }: { technologies: string[]; label: string }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const remaining = Math.max(technologies.length - 4, 0);
  return (
    <div className="technologies">
      <ul className="technology-list" id={listId} aria-label={`${label} technologies`}>
        {(expanded ? technologies : technologies.slice(0, 4)).map((technology) => <ExperienceAbility key={technology} name={technology} />)}
      </ul>
      {remaining > 0 && (
        <button type="button" className="technology-toggle" aria-expanded={expanded} aria-controls={listId}
          aria-label={`${expanded ? "Show fewer technologies" : `Show ${remaining} more technologies`} for ${label}`}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show fewer" : `Show ${remaining} more`}<span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      )}
    </div>
  );
}
