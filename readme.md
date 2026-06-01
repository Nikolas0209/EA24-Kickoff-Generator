# Kickoff Generator 

## Overview

Kickoff Generator is a full-stack football matchup generator that allows users to generate random football matches between clubs and national teams.
This project is structured as a monorepo containing both frontend and backend applications.

The application supports:
- Random club kickoffs
- Random country kickoffs
- Rating-based matchmaking
- Team reroll functionality
- Competition and league filtering
- Kickoff history tracking and management

The project consists of:
- Frontend (React + TypeScript) *(currently in development)*
- Backend (Node.js + Express + MongoDB)

---

## Tech Stack

Frontend:
- React
- Vite
- TypeScript
- CSS

Backend:
- Node.js
- Express.js
- MongoDB (Native Driver)
- JavaScript (ES Modules)

---

## Project Structure

frontend/
backend/

backend/src/
├── assets/
│   ├── club logos
│   ├── country logos
│   └── league logos
│
├── routes/
│   ├── club.routes.js
│   ├── country.routes.js
│   └── kickoffHistory.routes.js
│
├── utils/
│   ├── applyFilters.js
│   ├── getCollection.js
│   ├── getRandomTeam.js
│   └── getRandomTeamByRating.js
│
├── seed/
│   ├── leagues/
│   ├── seedClubs.js
│   └── seedCountries.js
│
├── db.js
└── server.js

backend/
├── .env
├── package.json
└── package-lock.json

---

## Features

Club kickoffs:
- Random match generation
- Rating-based match generation
- Filtering by competition and league
- Cross-league matches
- Team reroll

Country kickoffs:
- Random match generation
- Rating-based match generation
- Team reroll

Kickoff history:
- Save generated matches
- Retrieve history
- Filter by type
- Delete single entry
- Delete all entries

---

## API Documentation

---

## Clubs

### GET /clubs

Generate random club kickoff.

Query:
- competition
- league
- homeLeague
- awayLeague

---

### GET /clubs/club-ratings

Generate rating-based club kickoff.

---

### GET /clubs/random-team/reroll

Reroll a single club team.

Query:
- competition
- league
- excludeId

---

### GET /clubs/club-ratings/reroll

Reroll rating-based club team.

Query:
- baseTeamId

---

## Countries

### GET /countries

Generate random country kickoff.

---

### GET /countries/country-ratings

Generate rating-based country kickoff.

---

### GET /countries/random-team/reroll

Reroll a single country team.

---

### GET /countries/country-ratings/reroll

Reroll rating-based country team.

Query:
- baseTeamId

---

## Kickoff History

### GET /kickoff-history

Get all kickoff history entries.

Query:
- type

---

### POST /kickoff-history

Save a kickoff entry.

Body:
- homeTeam
- awayTeam
- type

---

### DELETE /kickoff-history

Delete all kickoff history.

---

### DELETE /kickoff-history/:id

Delete single kickoff entry by id.

---

## Error Handling

- 400 → Bad request (invalid or missing data)
- 404 → Not found
- 500 → Server error

Common errors:
- Not enough teams available
- Base team not found
- Invalid ObjectId format

---

## Database

MongoDB collections:
- clubs
- countries
- kickoff-history

---

## Installation

npm install  
npm start

---

## Environment Variables

Create a `.env` file in the backend root:

MONGO_URI=your_mongo_connection_string  
PORT=3000
