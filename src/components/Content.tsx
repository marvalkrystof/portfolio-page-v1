import "../index.css";
import ContentBox from "./ContentBox";
import ExperienceCard from "./ExperienceCard";

import { useEffect, useState } from "react";
import linkIcon from "../assets/chain-icon.svg";

interface ExperienceBase {
  description: string;
  technologies: Array<string>;
}

interface WorkExperience extends ExperienceBase {
  start_date: string;
  end_date: string;
  position_name: string;
  institution_name: string;
}

interface ProjectExperience extends ExperienceBase {
  image_path: string;
  project_name: string;
  project_link: string;
}

interface CertificationExperience extends ExperienceBase {
  institution_name: string;
  certification_name: string;
  date: string;
}

interface ContentData {
  workExperiences: Array<WorkExperience>;
  education: Array<WorkExperience>;
  projects: Array<ProjectExperience>;
  certifications: Array<CertificationExperience>;
}

const emptyContentData: ContentData = {
  workExperiences: [],
  education: [],
  projects: [],
  certifications: [],
};

const withBaseUrl = (path: string) => {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

export interface ContentProps {
  refs: {
    about: React.RefObject<HTMLDivElement>;
    experience: React.RefObject<HTMLDivElement>;
    education: React.RefObject<HTMLDivElement>;
    projects: React.RefObject<HTMLDivElement>;
    certifications: React.RefObject<HTMLDivElement>;
  };
}

function Content({ refs }: ContentProps) {
  const [contentData, setContentData] = useState<ContentData>(emptyContentData);

  useEffect(() => {
    let isMounted = true;

    const loadContentData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/content.json`
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load portfolio content (${response.status})`
          );
        }

        const data = (await response.json()) as ContentData;

        if (!isMounted) {
          return;
        }

        setContentData({
          ...data,
          projects: data.projects.map((project) => ({
            ...project,
            image_path: withBaseUrl(project.image_path),
          })),
        });
      } catch (error) {
        console.error("Failed to load portfolio content data:", error);
      }
    };

    loadContentData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <main className="h-fit flex flex-wrap justify-center md:w-7/12 sm:w-full md:h-full pt-16">
        <ContentBox ref={refs.about} text="ABOUT">
          <p className="ml-2 mb-4 text-gray-400">
            Hi! My name is{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              Kryštof
            </span>
            . I am a Software developer based in{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              Prague, Czech Republic
            </span>
            .
          </p>
          <p className="ml-2 mb-4 text-gray-400">
            I have experience in{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              Software Development
            </span>
            ,{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              {" "}
              Networking{" "}
            </span>{" "}
            and{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              {" "}
              Relational Database Design
            </span>
            .
          </p>
          <p className="ml-2 mb-4 text-gray-400">
            When I'm at my computer, I'm either{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              {" "}
              working{" "}
            </span>{" "}
            or{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              playing my favorite rogue-like
            </span>
            . When I'm away from the screen, I enjoy playing
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              {" "}
              chess
            </span>
            ,{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              working out
            </span>
            ,{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              bouldering
            </span>
            , or{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              watching the newest bizarre reality show.
            </span>
          </p>
          <p className="ml-2 mb-4 text-gray-400">
            This page was hugely inspired by{" "}
            <a
              className="underline text-white hover:text-background-complementary transition-all duration-300"
              href="https://brittanychiang.com/"
              target="_blank"
            >
              Brittany Chiang's portfolio page.
            </a>
          </p>
          <p className="ml-2 text-gray-400">
            Built with{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              {" "}
              React{" "}
            </span>{" "}
            and{" "}
            <span className="text-white inline hover:text-background-complementary transition-all duration-300">
              {" "}
              Tailwind CSS.{" "}
            </span>
          </p>
        </ContentBox>

        <ContentBox ref={refs.experience} text="EXPERIENCE">
          {contentData.workExperiences.map((element, index) => (
            <ExperienceCard key={index} {...element} />
          ))}
          <a href="https://marvalkrystof.github.io/CV/" target="_blank">
            <div className="group flex gap-3 transition rounded p-2 items-center hover:bg-content-background-hover hover:-translate-y-1 hover:text-background-complementary duration-300">
              <p className="text-xl">Get CV here</p>
              <img
                className="w-6 h-6 group-hover:animate-bounce ease-in"
                src={linkIcon}
              ></img>
            </div>
          </a>
        </ContentBox>
        <ContentBox ref={refs.education} text="EDUCATION">
          {contentData.education.map((element, index) => (
            <ExperienceCard key={index} {...element} />
          ))}
        </ContentBox>
        <ContentBox ref={refs.projects} text="PROJECTS">
          {contentData.projects.map((element, index) => (
            <ExperienceCard key={index} {...element} />
          ))}
        </ContentBox>
        <ContentBox ref={refs.certifications} text="CERTIFICATIONS">
          {contentData.certifications.map((element, index) => (
            <ExperienceCard key={index} {...element} />
          ))}
        </ContentBox>
      </main>
    </>
  );
}

export default Content;
