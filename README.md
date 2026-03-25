# Portfolio Website (V1)

A personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.  
This project showcases experience, education, projects, certifications, and social links in a responsive single-page layout with a `tsParticles` animated background.

## Live Site

`https://marvalkrystof.github.io/portfolio-page-v1/`

## Features

- Responsive portfolio layout with sticky desktop sidebar and mobile section headers
- Smooth scrolling navigation between sections (`About`, `Experience`, `Education`, `Projects`, `Certifications`)
- Interactive section highlighting using `IntersectionObserver`
- Animated background powered by `@tsparticles/react`
- Reusable cards for experience, projects, and certifications
- Quick access to CV (`public/CV.pdf`) and social/contact links

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- tsParticles
- ESLint
- GitHub Pages (`gh-pages`)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will start the development server (typically at `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start the local development server
- `npm run build` - Type-check and build production assets into `dist/`
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks
- `npm run predeploy` - Build the app before deployment
- `npm run deploy` - Deploy `dist/` to GitHub Pages

## Deployment

This repository is configured for GitHub Pages deployment:

- `vite.config.ts` uses `base: "/portfolio-page-v1/"`
- `package.json` includes:
  - `"homepage": "https://marvalkrystof.github.io/portfolio-page-v1/"`
  - deployment scripts using `gh-pages`

Deploy with:

```bash
npm run deploy
```

If you fork or rename the repository, update both `homepage` and Vite `base` to match your new GitHub Pages path.

## Project Structure

```text
.
├── public/                 # Static files (favicon, CV, JSON content, images)
├── src/
│   ├── assets/             # Images and icons
│   ├── components/         # UI components
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # App composition + particles config
│   ├── main.tsx            # React entry point
│   └── index.css           # Tailwind imports + global font
├── tailwind.config.js      # Tailwind theme extensions
├── vite.config.ts          # Vite config + GitHub Pages base path
└── package.json            # Scripts and dependencies
```

## Customization Notes

- Main content data lives in `public/data/content.json`:
  - `workExperiences`
  - `education`
  - `projects`
  - `certifications`
- Project images referenced by JSON are served from `public/images/`
- `src/components/Content.tsx` fetches and renders `content.json` at runtime
- Social links are in `src/components/SidebarSocials.tsx`
- Section navigation behavior is in `src/components/SidebarNavButton.tsx`
- Replace `public/CV.pdf` with your own CV file to update the download link
