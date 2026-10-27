import { useEffect, useRef, useState } from "react";
import ContentBox from "./ContentBox";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import { sections } from "../data/navigation";
import type { ContentData } from "../types/content";

const emptyContentData: ContentData = {
  workExperiences: [], education: [], projects: [], certifications: [],
};

function validateContent(value: unknown): value is ContentData {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  const required = {
    workExperiences: ["start_date", "end_date", "position_name", "institution_name"],
    education: ["start_date", "end_date", "position_name", "institution_name"],
    projects: ["image_path", "project_name", "project_link"],
    certifications: ["institution_name", "certification_name", "date"],
  };
  return Object.entries(required).every(([key, fields]) => {
    const entries = data[key];
    return Array.isArray(entries) && entries.every((entry) =>
      entry && typeof entry === "object" &&
      [...fields, "description"].every((field) => typeof entry[field] === "string") &&
      Array.isArray(entry.technologies) && entry.technologies.every((tag: unknown) => typeof tag === "string")
    );
  });
}

export default function Content() {
  const [contentData, setContentData] = useState<ContentData>(emptyContentData);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const initialHash = useRef(window.location.hash);

  useEffect(() => {
    const controller = new AbortController();
    const loadContent = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/content.json`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Unable to load portfolio content (${response.status})`);
        const data: unknown = await response.json();
        if (!validateContent(data)) throw new Error("Invalid portfolio content");
        if (controller.signal.aborted) return;
        setContentData({
          ...data,
          projects: data.projects.map((project) => ({
            ...project,
            image_path: `${import.meta.env.BASE_URL}${project.image_path.replace(/^\/+/, "")}`,
          })),
        });
        setStatus("ready");
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load portfolio content:", error);
          setStatus("error");
        }
      }
    };
    loadContent();
    return () => {
      controller.abort();
    };
  }, [attempt]);

  useEffect(() => {
    const hash = initialHash.current;
    if (status !== "ready" || !sections.some(({ id }) => hash === `#${id}`)) return;
    let cancelled = false;
    let frame = 0;
    let onLoad = () => {};

    // Wait for content, fonts, and the browser's initial fragment scroll to settle.
    const loaded = new Promise<void>((resolve) => {
      onLoad = resolve;
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", onLoad, { once: true });
    });
    Promise.all([loaded, document.fonts.ready]).then(() => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => {
        if (window.location.hash === hash) {
          document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
        }
        initialHash.current = "";
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, [status]);

  const placeholder = (label: string) => status !== "ready" ? (
    <p className="section-placeholder">{status === "loading" ? `Loading ${label}…` : `${label} could not be loaded. Use the retry button above.`}</p>
  ) : null;

  return (
    <main className="main-content" id="main-content" tabIndex={-1}>
      <ContentBox id="about" text="About">
        <div className="about-copy">
          <p>
            I’m a software developer based in Prague, working at the intersection of <strong>software engineering, data, and research</strong>.
            At MSD, I build tools that support experimental chemistry, from applications for scientists to infrastructure and deployment workflows.
          </p>
          <p>
            My background spans data engineering, security, and database design. I like understanding how things work by building them,
            whether that’s a molecule renderer in C or a local AI email organizer. Away from the screen, you’ll find me playing chess,
            bouldering, or getting into a roguelike.
          </p>
        </div>
      </ContentBox>
      <div className="content-status" aria-live="polite" aria-atomic="true">
        {status === "loading" && <p className="loading-message" role="status">Loading experience and projects…</p>}
        {status === "error" && (
          <div className="content-error">
            <div><h2>Couldn’t load portfolio details</h2><p>Please try again. You can still view my CV or get in touch.</p></div>
            <button type="button" className="button button-secondary" onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}>Try again</button>
          </div>
        )}
      </div>
      <ContentBox id="experience" text="Experience">
        {placeholder("experience")}
        {contentData.workExperiences.map((entry) => <ExperienceCard key={`${entry.institution_name}-${entry.start_date}`} {...entry} />)}
      </ContentBox>
      <ContentBox id="projects" text="Projects" count={status === "ready" ? contentData.projects.length : undefined}>
        {placeholder("projects")}
        {contentData.projects.map((project) => <ProjectCard key={project.project_link} project={project} />)}
      </ContentBox>
      <ContentBox id="education" text="Education">
        {placeholder("education")}
        {contentData.education.map((entry) => <ExperienceCard key={`${entry.institution_name}-${entry.start_date}`} {...entry} />)}
      </ContentBox>
      <ContentBox id="certifications" text="Certifications">
        {placeholder("certifications")}
        {contentData.certifications.map((entry) => <ExperienceCard key={`${entry.institution_name}-${entry.certification_name}`} {...entry} />)}
      </ContentBox>
      <footer className="page-footer">
        <p>Have something in mind? <a href="https://www.linkedin.com/in/krystofmarval/" target="_blank" rel="noopener noreferrer">Let’s talk <span aria-hidden="true">↗</span><span className="sr-only"> on LinkedIn (opens in a new tab)</span></a></p>
        <p>Built with React and Tailwind CSS. Inspired by <a href="https://brittanychiang.com/" target="_blank" rel="noopener noreferrer">Brittany Chiang<span className="sr-only"> (opens in a new tab)</span></a>.</p>
        <a className="back-to-top" href="#about">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </main>
  );
}
