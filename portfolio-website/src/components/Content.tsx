import '../index.css'
import ContentBox from './ContentBox'
import {Experience} from './ExperienceCard'
import ExperienceCard from './ExperienceCard'

import ascii_art_pengu from '../assets/ascii_art_pengu.png'
import banking_app from '../assets/banking_app.png'
import knapsack_problem from '../assets/knapsack.png'
import car_crash_estimator from '../assets/car_crash_estimator.png'
import portfolio from '../assets/portfolio.png'
import linkIcon from '../assets/chain-icon.svg'

export interface ContentProps {
  refs: {
    about: React.RefObject<HTMLDivElement>;
    experience: React.RefObject<HTMLDivElement>;
    education: React.RefObject<HTMLDivElement>;
    projects: React.RefObject<HTMLDivElement>;
    certifications: React.RefObject<HTMLDivElement>;
  };
}

const workExperiences : Array<Experience>  = [
    {
      start_date: "JUNE 2024",
      end_date: "NOW",
      position_name: "Data Engineer",
      institution_name: "Direct Fidoo",
      description: "I joined the company at the start of the Data Lake integration and worked closely with the main Data Engineer. I created and managed data pipelines using ADF, wrote custom Python scripts that were run on Azure Batch service, and prepared custom export solutions in XSLT for the Fidoo app. My biggest achievement was implementing a custom logging solution, which included everything from the logging library to the final Power BI report, providing crucial insights into our script runs.",
      technologies: ["Python", "pandas", "SQL", "pyarrow", "Azure Data Factory", "Azure Batch", "Git", "JIRA", "Power BI", "Azure Data Lake","CosmosDB", "XSLT"]
    },
    {
      start_date: "NOV 2022",
      end_date: "JUNE 2024",
      position_name: "SOC Analyst",
      institution_name: "NN IT Hub",
      description: "It was my responsibility to monitor, review, and respond to security alerts and incidents, ensuring the timely identification of potential threats, analyzing suspicious activities, and implementing appropriate remediation measures to safeguard the organization's network and data.",
      technologies: ["Splunk/SPL", "Azure AD", "MS Defender", "KQL", "Git", "OSINT", "Networking", "IDS/IPS", "ServiceNow"]
    }
          
]

const education : Array<Experience>  = [
  {
      start_date: "SEP 2023",
      end_date: "NOW",
      position_name: "Data Analytics",
      institution_name: "VŠE FIS",
      description: "A 3.5-year degree with a strong emphasis on practical application over theory, highlighted by a mandatory internship in the final semester. One-third of the courses are taught in English. The curriculum focuses on foundational statistics, machine learning methods, and various data-related disciplines",
      technologies: ["Python",  "Statistic methods and Probability theory", "Calculus and Linear Algebra","Machine Learning", "Basics of Economics and Accounting", "Database design", "Text Analytics", "Big Data", "BI", "Algorithmization and Data Structures"]
    },
    {
      start_date: "SEP 2019",
      end_date: "MAY 2023",
      position_name: "IT",
      institution_name: "SPŠE Ječná",
      description: "Learned a bit of everything ranging from databases, networks, operating systems, and programming. This gave me a great base knowledge, which I used to further develop my skills. Mostly took interest in programming. Graduated with straight A's.",
      technologies: ["Database design", "OOP Programming", "Java", "C#", "HTML/CSS", "SQL", "Linux","Python","JavaScript", "Application Architecture","Embedded", "Networking"]
    },         
]

const projects : Array<Experience> = [

  {
    image_path : portfolio,
    project_name: "Portfolio Site",
    description: "Mainly serves the purpose of a portfolio and frontend developent practice.",
    project_link: "https://github.com/marvalkrystof/portfolio-page-v1",
    technologies: ['React', 'Tailwind', 'Typescript']
  },
  {
    image_path : car_crash_estimator,
    project_name: "DamageSense",
    description: "For an extracurricular course I completed at EY, my colleagues and I worked on a data-driven project where we developed a website that estimates car crash costs based on user-provided parameters. We used the Chicago car crash dataset from Kaggle and built the site using Anvil, a Python-based web framework. The cost estimation was powered by various machine learning algorithms on the backend, including neural networks, linear regression, and random forest, which were applied in a binary classification format.",
    project_link: "https://github.com/marvalkrystof/car_crash_estimator",
    technologies: ['Python','Machine learnining algorithms', 'Anvil']
  },
{
  image_path : knapsack_problem,
  project_name: "0-1 Knapsack-Problem",
  description: "Tried solving the NP-complete problem using 4 different approaches. 1. Bruteforce, 2. Bruteforce with paralelization, 3. Using dynamic programming, 4. Using distributed programming (master/slave architecture)",
  project_link: "https://github.com/marvalkrystof/0-1-Knapsack-Problem---four-ways",
  technologies: ['C#', 'Bruteforce', 'Paralelization', 'Dynamic programming', 'Distributed programming']
},
{
  image_path : banking_app,
  project_name: "Banking App",
  description: "For my 4th-year high school project, I developed a banking app with a simple user interface. The app supported key features such as transactions between accounts, basic authentication, account creation, account summaries, scheduling meetings between employees and users, and an admin panel. Its primary purpose was to demonstrate database anomalies that could occur at different transaction isolation levels (e.g., Phantom Reads). The app was built using MVC architecture.",
  project_link: "https://github.com/marvalkrystof/Beta3-Banking-App",
  technologies: ['MVC', 'MsSQL', 'ASP.NET', 'C#', 'Unit Testing', 'Logging']
},
{
  image_path : ascii_art_pengu,
  project_name: "ASCII Art Converter",
  description: "As my 3rd-year high school project, I developed a CLI ASCII Art Converter app. The program could convert images in various formats into ASCII art, with output options including console display, text format, .png, and HTML. It also supported video inputs, including YouTube links, processing them into ASCII video format. The project is currently stored on Git LFS.",
  project_link: "https://github.com/marvalkrystof/Mini_Omega_ASCII_ART_CONVERTER",
  technologies: ['C#', "Git LFS", "Image and Video processing", "Encoding"]
}


]

const certifications : Array<Experience> =  [
  
  {
    institution_name : "Oracle",
    certification_name : "Database Design and Programming with SQL",
    date : "MAR 2023",
    description :"Essentials of database design and architecure and database programming with Oracle DB.",
    technologies : ['Database Programming', 'Oracle DB', 'Database Design']
  
    }
  ,{
    institution_name : "Cisco",
    certification_name : "NDG Linux Essentials",
    date : "DEC 2021",
    description :"Basics of Linux operating system.",
    technologies : ['Linux']
  
    }
  ,{
  institution_name : "Oracle",
  certification_name : "Java Foundations",
  date : "NOV 2020",
  description :"Basics of Java programming.",
  technologies : ['Java']

  }
]


function Content({refs} : ContentProps) {
  


  return (
    <>
    <main className='h-fit flex flex-wrap justify-center md:w-7/12 sm:w-full md:h-full pt-16'>
    
    <ContentBox ref={refs.about} text="ABOUT">
    <p className="ml-2 mb-4 text-gray-400">Hi! My name is <span className='text-white inline hover:text-background-complementary transition-all duration-300'>Kryštof</span>. I am a Software developer based in <span className='text-white inline hover:text-background-complementary transition-all duration-300'>Prague, Czech Republic</span>.</p>
    <p className="ml-2 mb-4 text-gray-400">I have experience in <span className='text-white inline hover:text-background-complementary transition-all duration-300'>OOP Programming</span>,<span className='text-white inline hover:text-background-complementary transition-all duration-300'> Full-stack Web Development</span>, <span className='text-white inline hover:text-background-complementary transition-all duration-300'> Networking </span> and <span className='text-white inline hover:text-background-complementary transition-all duration-300'> Relational Database Design</span>.</p>
    <p className="ml-2 mb-4 text-gray-400">When I'm at my computer, I'm either <span className='text-white inline hover:text-background-complementary transition-all duration-300'> working </span> or <span className='text-white inline hover:text-background-complementary transition-all duration-300'>playing my favorite rogue-like</span>. When I'm away from the screen, I enjoy playing<span className='text-white inline hover:text-background-complementary transition-all duration-300'> chess</span>, <span className='text-white inline hover:text-background-complementary transition-all duration-300'>working out</span>, <span className='text-white inline hover:text-background-complementary transition-all duration-300'>bouldering</span>, or <span className='text-white inline hover:text-background-complementary transition-all duration-300'>watching the newest bizarre reality show.</span></p>
    <p className="ml-2 mb-4 text-gray-400">This page was hugely inspired by <a className='underline text-white hover:text-background-complementary transition-all duration-300' href="https://brittanychiang.com/" target="_blank">Brittany Chiang's portfolio page.</a></p>
    <p className="ml-2 text-gray-400">Built with <span className='text-white inline hover:text-background-complementary transition-all duration-300'> React </span> and <span className='text-white inline hover:text-background-complementary transition-all duration-300'>  Tailwind CSS. </span></p>
    </ContentBox>
    
    <ContentBox ref={refs.experience} text="EXPERIENCE">
    {
                    workExperiences.map((element : Experience, index) => (
                        <ExperienceCard
                            key={index}
                            {...element}
                        />
                    ))
                }
    <a href="CV.pdf" target="_blank">
    <div className='group flex gap-3 transition rounded p-2 items-center hover:bg-content-background-hover hover:-translate-y-1 hover:text-background-complementary duration-300'>
    <p className='text-xl'>Get CV here</p>
    <img className="w-6 h-6 group-hover:animate-bounce ease-in" src={linkIcon}></img>
    </div>
    </a>
    </ContentBox>
    <ContentBox ref={refs.education} text="EDUCATION">
    {
                    education.map((element : Experience, index) => (
                        <ExperienceCard
                            key={index}
                            {...element}
                        />
                    ))
                }
    </ContentBox>
    <ContentBox ref={refs.projects} text='PROJECTS'>
      {
      projects.map((element : Experience ,index : number) => (
        <ExperienceCard
        key={index}
        {...element}
        />
      ))

      }
    </ContentBox>
    <ContentBox ref={refs.certifications} text="CERTIFICATIONS">
      {
             certifications.map((element : Experience ,index : number) => (
              <ExperienceCard
              key={index}
              {...element}
              />
            ))

      }
    </ContentBox>
    </main>
    </>
  )
}

export default Content
