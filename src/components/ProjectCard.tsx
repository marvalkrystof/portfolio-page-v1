import TechnologyList from "./TechnologyList";
import type { ProjectExperience } from "../types/content";

export default function ProjectCard({ project }: { project: ProjectExperience }) {
  return (
    <article className="project-card">
      <a className="project-preview" href={project.project_link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.project_name} (opens in a new tab)`}>
        <img src={project.image_path} alt={`${project.project_name} project preview`} width="800" height="500" loading="lazy" decoding="async" />
      </a>
      <div className="project-details">
        <h3>
          <a className="project-title" href={project.project_link} target="_blank" rel="noopener noreferrer">
            {project.project_name}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        <p className="entry-description">{project.description}</p>
        <TechnologyList technologies={project.technologies} label={project.project_name} />
      </div>
    </article>
  );
}
