# CarbonFootprintTracker


Lightweight app to estimate personal carbon footprints, provide recommendations, and track reduction goals.

Features
- Emissions calculation service with transparent formulas
- Recommendation engine and goal tracking
- Accessible React UI with responsive design
- Docker-ready (backend + frontend)

Quickstart

Prerequisites: Docker Desktop (or Docker Engine) and Git.

Run locally with Docker Compose:

```bash
docker compose up --build
# Frontend: http://localhost:5173
# API: http://localhost:3333
```

Development

Install dependencies and run frontend or backend separately (requires Node/npm):

```bash
# Install
npm install

# Build frontend
npm run frontend:build

# Build backend
npm run build

# Start backend (development)
npm start
```

Contributing

Create issues or PRs. Run tests with `npm test`.

License: MIT
# Carbon Footprint Reduction Assistant

## Overview

This project implements a production-grade Carbon Footprint Assistant that helps individuals calculate, track, and reduce their carbon footprint through personalized recommendations and a progress dashboard.

## Features

- Calculate estimated carbon footprint by transportation, energy, and lifestyle
- Track emissions over time and set reduction goals
- Personalized, dynamic recommendations with estimated impact
- REST API backend with validation and secure defaults
- Minimal accessible React frontend components (starter)
- Unit and integration tests for core logic

## Architecture

Clean separation between services, models, validators, and API. Calculation and recommendation logic are implemented as pure services for testability.

## Technology Stack

- Node.js + Express (TypeScript)
- React (TypeScript) components (minimal starter)
- Jest + Supertest for testing

## Installation

Install dependencies:

```bash
npm install
```

Create an `.env` file if you need to override defaults (e.g., PORT).

## Running Locally

Development server:

```bash
npm run dev
```

Build + run:

```bash
npm run build
npm start
```

## Testing

Run tests:

```bash
npm test
```

## Security Considerations

- Input validation and sanitization in API
- Use environment variables for secrets
- Helmet + CORS enabled in server

## Accessibility Features

- Components use semantic HTML
- Forms include labels and ARIA attributes

## Assumptions

- Emission factors are simplified, transparent, and documented in code
- This repo provides core logic and a minimal frontend; production deployment will require bundling and hosting config

## Future Improvements

- Add auth, persistent storage, and user accounts
- Add charting on frontend, richer UI/UX
- Add analytics and long-term trend storage

## Project Structure

See `src/` for services, models, validators, components, and tests.
