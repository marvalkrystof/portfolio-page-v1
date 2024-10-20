import "../index.css";
import ExperienceAbility from "./ExperienceAbility";
import linkIcon from '../assets/chain-icon.svg'
import useWindowDimensions from "../hooks/WindowDimensions";

interface ExperienceBase {
  description: string;
  technologies: Array<string>;
}

interface WorkExperience extends ExperienceBase {
  start_date: string;
  end_date: string;
  position_name: string;
  institution_name: string;
  project_name?: never;
  image_path?: never;
  project_link?: never;
  date? : never;
  certification_name? : never;
}

interface ProjectExperience extends ExperienceBase {
  project_name: string;
  image_path: string;
  project_link: string;
  start_date?: never;
  end_date?: never;
  position_name?: never;
  institution_name?: never;
  date? : never;
  certification_name? : never;
}

interface CertificationExperience extends ExperienceBase {
  date : string;
  certification_name : string;
  institution_name : string;
  start_date? : never,
  end_date? : never,
  position_name?: never,
  image_path? : never,
  project_name? : never,
  project_link? : never,
  

}

type Experience = ProjectExperience | WorkExperience | CertificationExperience;

function ExperienceCard(props: Experience) {

  const window = useWindowDimensions()

  return (
    <>
      <a href={props.project_link} className="w-full" target="_blank">
      <div className="group flex flex-wrap md:flex-nowrap md:gap-4 mb-1 mt-1 pb-2 pt-2 hover:bg-content-background hover:-translate-x-2 hover:-translate-y-2 rounded transition-all duration-300">
        <header className="w-full md:w-3/12 md:h-1/2 md:justify-center flex">
          {props.start_date && props.end_date ? (
            <span className="mb-2 md:mb-0 text-sm text-gray-400 md:mt-1">
              {props.start_date} — {props.end_date}
            </span>
          )          
          : props.image_path && window.width >= 768 ? (
            <img className="mt-1 w-10/12 h-16 border-solid border-2 border-gray-700 rounded-lg" src={props.image_path}></img>
          )
          : 
          props.date  ? (
            <span className="text-sm text-gray-400 mt-1">
            {props.date}
          </span>
           )
          
          : (
            <p className="hidden">Data Error</p>
          )}
        </header>
        <div className="w-full md:w-9/12">
          <div className="mb-1 md:mb-0 text-2xl group-hover:text-background-complementary transition-all duration-300 text-white flex items-center gap-2">
          {props.position_name && props.institution_name ? (
            <span>
              {props.position_name} · {props.institution_name}
            </span>
          )
          
          : props.certification_name && props.institution_name ? (
            <span>{props.certification_name} · {props.institution_name}</span>
          )
           : props.project_name ? (
            <span>{props.project_name}</span>
          )     
          : (
            <p className="hidden">Data Error</p>
          )}
          {props.project_link && <img className="w-4 h-4 group-hover:animate-bounce ease-in" src={linkIcon}></img>}
          </div>
          <p className="text-sm text-gray-400">{props.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {props.technologies.map((element, index) => (
              <ExperienceAbility key={index} name={element} />
            ))}
          </div>
          {props.image_path && window.width < 768 && <img className="mt-8 w-1/2 border-solid border-2 border-gray-700 rounded-lg" src={props.image_path}></img>}
        </div>
      </div>
      </a>
    </>
  );
}

export default ExperienceCard;
export type { Experience };
