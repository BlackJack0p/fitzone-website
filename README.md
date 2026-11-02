# FitZone — Fitness Studio Website

A responsive fitness studio website developed as part of my web development learning journey. The project started as a static HTML and CSS website and was progressively developed into a full-stack application using React, Tailwind CSS, Node.js, Express, PostgreSQL, authentication, and payment integration.

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

### Week 4 — Payment Integration

- Integrated Paystack to support monthly recurring membership subscriptions.
- Used Paystack Test Mode to test the payment process without processing real payments.
- Added database tables for orders and order items using Drizzle ORM.
- Created a checkout route that requires users to be authenticated.
- Retrieved membership prices and Paystack plan information from the database rather than relying on values supplied by the frontend.
- Created pending orders before redirecting users to the hosted Paystack checkout page.
- Implemented a Paystack webhook to receive payment notifications.
- Added webhook signature validation using HMAC SHA512.
- Verified transactions with the Paystack Verify API before updating order statuses.
- Added checks for transaction references, payment amounts, currencies, and payment statuses.
- Ensured that orders are only marked as paid after successful payment verification.
- Added order-status checking so unsuccessful or abandoned payments can be identified.
- Implemented a payment success page that checks the order status and waits for confirmation.
- Tested successful and declined payments using Paystack Test Mode.
- Updated the frontend to handle the checkout process and display payment-status information.

**Payment Provider:** Paystack was used as an alternative to Stripe after approval from the lecturer because of Stripe's merchant onboarding limitations in South Africa.

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

### Payments

- **Paystack** — Hosted checkout and recurring membership payments.
- **Paystack Test Mode** — Testing successful and declined transactions.
- **Paystack Webhooks** — Receiving and verifying payment notifications.

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
- Authenticated membership checkout.
- Monthly recurring membership subscriptions.
- Paystack hosted payment checkout.
- Payment verification through Paystack webhooks.
- Order and order-item records stored in PostgreSQL.
- Payment success and failure status handling.
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
│   │   │   ├── About.jsx
│   │   │   ├── ClassSchedule.jsx
│   │   │   ├── FavouriteButton.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MembershipDetail.jsx
│   │   │   ├── Memberships.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   ├── TrainerCard.jsx
│   │   │   ├── TrainerDetail.jsx
│   │   │   └── Trainers.jsx
│   │   ├── data/
│   │   ├── lib/
│   │   │   ├── auth-client.js
│   │   │   └── format.js
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
│   │   │   ├── index.js
│   │   │   ├── schema.js
│   │   │   ├── seed.js
│   │   │   └── data/
│   │   │       ├── classes.js
│   │   │       ├── memberships.js
│   │   │       └── trainers.js
│   │   ├── middleware/
│   │   │   └── requireAuth.js
│   │   ├── routes/
│   │   │   ├── classes.js
│   │   │   ├── memberships.js
│   │   │   ├── orders.js
│   │   │   └── trainers.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── drizzle/
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

Create a local `.env` file containing the environment variables required by the backend. Use your own database connection string, authentication secret, and Paystack test secret key.

Example environment variable names:

```env
DATABASE_URL="your-database-connection-string"
BETTER_AUTH_SECRET="your-authentication-secret"
BETTER_AUTH_URL="http://localhost:3000"
CLIENT_URL="http://localhost:5173"
PAYSTACK_SECRET_KEY="your-paystack-test-secret-key"
PORT=3000
```

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

The database includes:

- Authentication-related tables managed by Better Auth.
- Application data for trainers, classes, and memberships.
- Orders containing payment information, order status, and transaction references.
- Order items linking purchased memberships to their corresponding orders.

Payment amounts are stored in cents to avoid floating-point calculation issues.

The backend health-check endpoint is:

[API Health Check](https://fitzone-api-tuqf.onrender.com/api/health)

Authentication endpoints are handled by Better Auth. The frontend authentication client communicates with the backend to manage registration, login, and session-related operations.

## Authentication and Security

Better Auth provides account registration, login, and session management.

Environment variables configure the database connection, authentication secret, backend URL, frontend URL, and Paystack secret key.

Sensitive configuration must remain outside version control. The `.env` file should be excluded through `.gitignore`, and production environment variables should be configured in the hosting platform's settings.

The payment integration includes additional security measures:

- Checkout routes require an authenticated user.
- Membership prices and Paystack plan codes are retrieved from the database.
- Orders are associated with the authenticated user.
- Users can only access their own order information.
- Paystack webhook signatures are validated before processing notifications.
- Transactions are verified with Paystack before an order is marked as paid.
- Payment amounts, currencies, and transaction references are checked against the stored order information.

Never publish database credentials, authentication secrets, Paystack secret keys, session tokens, or other sensitive authentication information.

## Payment Integration

FitZone uses Paystack to process monthly recurring membership subscriptions.

Paystack was selected as an alternative to Stripe after approval from the lecturer because Stripe's standard merchant onboarding does not directly support South African businesses.

The integration uses Paystack Test Mode, allowing the checkout process to be tested without processing real payments.

### Payment Process

1. A user selects a membership plan.
2. The user must be logged in before proceeding to checkout.
3. The backend retrieves the membership price and Paystack plan code from the database.
4. A pending order and its order item are created in PostgreSQL.
5. The backend initializes a Paystack transaction.
6. The user is redirected to Paystack's hosted checkout page.
7. Paystack processes the test transaction and sends a notification to the backend webhook.
8. The backend validates the webhook signature and verifies the transaction using the Paystack Verify API.
9. The backend checks the transaction reference, amount, currency, and payment status.
10. The order is marked as paid only after successful verification.
11. The frontend checks the order status and displays the appropriate payment result.

If a payment is declined or abandoned, the order can be checked and updated to reflect its unsuccessful status.

### Payment Testing

The payment integration was tested using Paystack Test Mode.

Testing included:

- Successful test payments.
- Declined test payments.
- Paystack webhook notifications.
- Webhook signature validation.
- Transaction verification.
- Order status updates in PostgreSQL.
- Checking that unsuccessful payments are not marked as paid.

## Deployment

The application is deployed using three services:

- **Vercel:** Hosts the React frontend.
- **Render:** Hosts the Node.js and Express backend.
- **Neon:** Hosts the PostgreSQL database.

Paystack is configured in Test Mode for payment testing.

The Vercel configuration forwards API requests to the Render backend over HTTPS. The backend connects to the Neon PostgreSQL database using its configured environment variables.

Production environment variables, including authentication and Paystack configuration, are stored in the hosting platform settings rather than committed to the repository.

The deployed application is available at:

[FitZone Website](https://fitzone-website-amber.vercel.app)

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
- Implementing authenticated checkout functionality.
- Integrating a third-party payment provider.
- Handling recurring membership payments.
- Validating payment notifications and verifying transactions.
- Managing orders and payment statuses in a database.
- Managing environment variables and application secrets.
- Using Git and GitHub for version control.
- Deploying a full-stack application to public hosting platforms.

## Future Improvements

- Improve accessibility and cross-device testing.
- Expand automated tests for frontend and backend functionality.
- Improve error handling and API validation.
- Expand database-backed functionality where appropriate.
- Add a dedicated membership management area for users.
- Improve the handling and display of recurring subscription statuses.
- Refine the website based on user feedback and assessment requirements.
- Investigate additional payment and subscription management features.

## Project Status

**Current stage:** Full-stack React and Tailwind CSS application with an Express backend, PostgreSQL database, authentication, Paystack payment integration, and public deployment.

This is a learning project developed incrementally to practise frontend development, backend programming, database integration, authentication, payment processing, and deployment.