
# FitZone — Fitness Studio Website

A responsive fitness studio website built as part of my web development learning journey. This project is being developed incrementally as I learn HTML, CSS, React, Tailwind CSS, and backend development.

## Project Progress

### Week 1 — HTML & CSS

- Built the initial static fitness studio website.
- Created the main sections, including the hero, about section, trainer profiles, class schedule, membership plans, and contact information.
- Added responsive styling and a consistent visual theme.

### Week 2 — React & Tailwind CSS

- Rebuilt the website using React and Tailwind CSS.
- Split the website into reusable React components.
- Moved trainer, class schedule, and membership information into data files.
- Implemented trainer filtering using React's `useState` hook.
- Added a favourites feature using a reusable controlled component.
- Reworked the layouts for mobile, tablet, and desktop screens.

## Technologies Used

- **HTML5** — Semantic page structure.
- **CSS3** — Original website styling and responsive design.
- **JavaScript (ES6+)** — Application logic and interactive features.
- **React** — Reusable components and UI state management.
- **Tailwind CSS** — Utility-based styling and responsive layouts.
- **Vite** — Development server and build tooling.
- **ESLint** — Code quality checks.

## Features

- Responsive fitness studio landing page.
- Trainer profiles with speciality filtering.
- Trainer favourites selection.
- Weekly class schedule.
- Membership plans and benefits.
- Email links for trainer contact and membership enquiries.
- Responsive navigation and page sections.

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd fitzone-website
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint to check the code. |

## Project Structure

```text
fitzone-website/
├── public/
│   └── images 
│       └── Trainers
│           ├── trainer-1.jpg
│           ├── trainer-2.jpg
│           └── trainer-3.jpg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Trainers.jsx
│   │   ├── TrainerCard.jsx
│   │   ├── FavouriteButton.jsx
│   │   ├── ClassSchedule.jsx
│   │   ├── Memberships.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── trainers.js
│   │   ├── classes.js
│   │   └── memberships.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Learning Objectives

This project helps me practise:

- Building responsive layouts using mobile-first design.
- Creating reusable React components.
- Passing data between components using props.
- Managing UI state with `useState`.
- Rendering lists from arrays of objects.
- Implementing filtering and interactive controls.
- Organising a frontend project into components and data files.
- Using Git and GitHub to track development progress.

## Future Improvements

- Improve accessibility and cross-device testing.
- Refine the website based on feedback and assessment requirements.
- Explore backend development and database integration.
- Investigate payment integration as a future learning stage.

## Project Status

**Current stage:** Week 2 — React and Tailwind CSS implementation.

This is a learning project and is still under development.
