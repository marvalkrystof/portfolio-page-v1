export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Competitions" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
