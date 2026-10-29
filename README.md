# FitZone — Fitness Studio Website

A responsive fitness studio website developed as part of my web development learning journey. The project started as a static HTML and CSS website and was progressively developed into a full-stack application using React, Tailwind CSS, Node.js, Express, PostgreSQL, and authentication.

## Live Website

- **Frontend:** [FitZone Website](https://fitzone-website-amber.vercel.app)
- **Backend:** [FitZone API](https://fitzone-api-tuqf.onrender.com)
- **Health Check:** [API Health Check](https://fitzone-api-tuqf.onrender.com/api/health)

## Project Progress

### Week 1 — HTML & CSS

- Built the initial static fitness studio website.
- Created the hero, about, trainer profiles, class schedule, membership plans, and contact sections.
- Added responsive styling and a consistent visual theme.

### Week 2 — React & Tailwind CSS

- Rebuilt the website using React and Tailwind CSS.
- Divided the interface into reusable React components.
- Organised trainer, class schedule, and membership information into JavaScript data files.
- Implemented trainer filtering using React's `useState` hook.
- Added a favourites feature using a reusable controlled component.
- Improved the layout for mobile, tablet, and desktop screens.

### Week 3 — Backend, Database, Authentication & Deployment

- Separated the application into `client/` and `server/` directories.
- Set up a PostgreSQL database hosted by Neon.
- Used Drizzle ORM for database schema and query integration.
- Added a database seed script for inserting initial application data.
- Built a backend using Node.js and Express.
- Integrated Better Auth for registration, login, and session management.
- Configured environment variables for database connections and authentication secrets.
- Deployed the frontend to Vercel and the backend to Render.
- Configured Vercel to forward API requests to the backend over HTTPS.

## Technologies Used

### Frontend

- **HTML5** — Semantic page structure.
- **JavaScript (ES6+)** — Application logic and interactive features.
- **React** — Reusable components and UI state management.
- **Tailwind CSS** — Utility-based styling and responsive layouts.
- **Vite** — Development server and production build tooling.

### Backend and Database

- **Node.js** — JavaScript runtime for the backend.
- **Express** — Backend server and API routes.
- **PostgreSQL** — Relational database hosted by Neon.
- **Drizzle ORM** — Database schema and queries.
- **Better Auth** — Authentication and session management.

### Development and Deployment

- **Git and GitHub** — Version control and source code hosting.
- **Vercel** — Frontend hosting and API proxy configuration.
- **Render** — Backend hosting.
- **ESLint** — Code quality checks.

## Features

- Responsive fitness studio website.
- Trainer profiles with speciality filtering.
- Trainer favourites selection.
- Weekly class schedule.
- Membership plans and benefits.
- Trainer contact links and membership enquiries.
- Reusable React components.
- PostgreSQL database integration.
- User registration and login.
- Session-based authentication.
- Backend health-check endpoint.
- Publicly accessible frontend and backend.

## Project Structure

The repository separates the frontend and backend to keep the application organised.

```text
fitzone-website/
├── client/
│   ├── public/
│   │   └── images/
│   │       └── Trainers/
│   ├── src/
│   │   ├── components/
│   │   │   ├──About.jsx
│   │   │   ├──ClassSchedule.jsx
│   │   │   ├──FavouriteButton.jsx
│   │   │   ├──Footer.jsx
│   │   │   ├──Header.jsx
│   │   │   ├──Hero.jsx
│   │   │   ├──Login.jsx
│   │   │   ├──MembershipDetail.jsx
│   │   │   ├──Memberships.jsx
│   │   │   ├──TrainerCard.jsx
│   │   │   ├──TrainerDetail.jsx
│   │   │   └──Trainers.jsx
│   │   ├── data/
│   │   ├── lib/
│   │   │   ├── auth-client.js
│   │   │   └──format.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├──index.js
│   │   │   ├──schema.js
│   │   │   ├──seed.js
│   │   │   └──data/
│   │   │      ├──classes.js
│   │   │      ├──memberships.js
│   │   │      └──trainers.js
│   │   ├── routes/
│   │   │   ├──classes.js
│   │   │   ├──memberships.js
│   │   │   └──trainers.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   ├── drizzle.config.js
│   └── render.yaml
├── .gitignore
└── README.md
```


## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- Git

To run the complete application locally, you also need a PostgreSQL database and the environment variables required by the backend.

### 1. Clone the Repository

```bash
git clone https://github.com/BlackJack0p/fitzone-website.git
cd fitzone-website
```

### 2. Set Up the Backend

Open a terminal in the `server` directory:

```bash
cd server
npm install
```

Create a local `.env` file containing the environment variables required by the backend. Use your own database connection string and authentication secret.

Do not commit `.env` files containing secrets to Git.

Start the backend:

```bash
npm start
```

### 3. Set Up the Frontend

Open a second terminal at the repository root:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in the terminal.

Ensure the frontend is configured to communicate with the backend during local development.

## Available Scripts

### Frontend (`client/`)

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the frontend for production. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint checks. |

### Backend (`server/`)

| Command | Description |
|---|---|
| `npm install` | Installs backend dependencies. |
| `npm start` | Starts the backend server. |

Additional database scripts are defined in `server/package.json`. Check that file for the exact commands used for database migrations, schema updates, and seeding.

## Database and API

The application uses PostgreSQL hosted by Neon. Drizzle ORM provides the database schema and query integration, while Express handles backend API requests.

The database includes authentication-related tables and application data.

The backend health-check endpoint is:

[https://fitzone-api-tuqf.onrender.com/api/health](https://fitzone-api-tuqf.onrender.com/api/health)

Authentication endpoints are handled by Better Auth. The frontend authentication client communicates with the backend to manage registration, login, and session-related operations.

## Authentication and Security

Better Auth provides account registration, login, and session management.

Environment variables configure the database connection, authentication secret, backend URL, and frontend URL.

Sensitive configuration must remain outside version control. The `.env` file should be excluded through `.gitignore`, and production environment variables should be configured in the hosting platform's settings.

Never publish database credentials, authentication secrets, session tokens, or other sensitive authentication information.

## Deployment

The application is deployed using two hosting services:

- **Vercel:** Hosts the React frontend.
- **Render:** Hosts the Node.js and Express backend.

The Vercel configuration forwards API requests to the Render backend over HTTPS. The backend connects to the Neon PostgreSQL database using its configured environment variables.

The deployed application is available at:

[https://fitzone-website-amber.vercel.app](https://fitzone-website-amber.vercel.app)

## Learning Objectives

This project provides practical experience with:

- Building responsive, mobile-first interfaces.
- Creating reusable React components.
- Passing data between components using props.
- Managing interface state with React hooks.
- Rendering and filtering arrays of objects.
- Building a backend using Node.js and Express.
- Designing and using a relational database.
- Using an ORM to interact with PostgreSQL.
- Implementing authentication and session management.
- Connecting a frontend to a backend API.
- Managing environment variables and application secrets.
- Using Git and GitHub for version control.
- Deploying a full-stack application to public hosting platforms.

## Future Improvements

- Improve accessibility and cross-device testing.
- Expand automated tests for frontend and backend functionality.
- Improve error handling and API validation.
- Expand database-backed functionality where appropriate.
- Refine the website based on user feedback and assessment requirements.
- Investigate payment integration as a future learning stage.

## Project Status

**Current stage:** Full-stack React and Tailwind CSS application with an Express backend, PostgreSQL database, authentication, and public deployment.

This is a learning project developed incrementally to practise frontend development, backend programming, database integration, authentication, and deployment.
