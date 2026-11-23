interface ExperienceBase {
  description: string;
  technologies: string[];
}

export interface WorkExperience extends ExperienceBase {
  start_date: string;
  end_date: string;
  position_name: string;
  institution_name: string;
}

export interface ProjectExperience extends ExperienceBase {
  image_path: string;
  project_name: string;
  project_link: string;
}

export interface CompetitionExperience extends ExperienceBase {
  competition_name: string;
  organizer: string;
  placement: string;
  date: string;
  event_link: string;
  project_name: string;
  project_link: string;
}

export interface CertificationExperience extends ExperienceBase {
  institution_name: string;
  certification_name: string;
  date: string;
}

export interface ContentData {
  workExperiences: WorkExperience[];
  education: WorkExperience[];
  projects: ProjectExperience[];
  competitions: CompetitionExperience[];
  certifications: CertificationExperience[];
}
