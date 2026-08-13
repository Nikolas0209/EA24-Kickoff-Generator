# EA24 Kickoff Generator

A full-stack football matchup generator inspired by EA SPORTS FC 24, allowing users to generate matchups between football clubs and national teams using random or rating-based matchmaking.

The project is organized as a monorepo containing separate frontend and backend applications.

## Overview

EA24 Kickoff Generator supports:

* Random club matchups
* Rating-based club matchmaking
* Random national-team matchups
* Rating-based national-team matchmaking
* Competition and league filtering
* Team rerolling
* Kickoff history tracking and management

# Applications

* Frontend — React + TypeScript + Vite
* Backend — Node.js + Express + MongoDB

⸻

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS
* Axios
* React Router
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB Native Driver
* JavaScript ES Modules

⸻

## Project Structure

```bash
 EA24-Kickoff-Generator/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── assets/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── seed/
│   │   ├── db.js
│   │   └── server.js
│   └── package.json
│
└── README.md 
```

⸻

## Features

### Club Kickoffs

* Generate random club matchups
* Generate rating-based matchups
* Filter clubs by competition
* Filter clubs by league
* Generate cross-league matchups
* Reroll individual teams

### Country Kickoffs

* Generate random national-team matchups
* Generate rating-based matchups
* Reroll individual teams

### Kickoff History

* Save generated matchups
* Retrieve previous matchups
* Filter history by kickoff type
* Delete individual history entries
* Delete the entire history

⸻

## API

The backend exposes REST endpoints for generating matchups, rerolling teams, and managing kickoff history.

### Clubs

#### GET /clubs

Generates a random club matchup.

Query parameters:

* competition
* league
* homeLeague
* awayLeague

#### GET /clubs/club-ratings

Generates a rating-based club matchup.

#### GET /clubs/random-team/reroll

Rerolls a single club team.

Query parameters:

* competition
* league
* excludeId

#### GET /clubs/club-ratings/reroll

Rerolls a team while maintaining the rating-based matchmaking rules.

Query parameters:

* baseTeamId

⸻

### Countries

#### GET /countries

Generates a random national-team matchup.

#### GET /countries/country-ratings

Generates a rating-based national-team matchup.

#### GET /countries/random-team/reroll

Rerolls a single national team.

#### GET /countries/country-ratings/reroll

Rerolls a team while maintaining the rating-based matchmaking rules.

Query parameters:

* baseTeamId

⸻

## Kickoff History

#### GET /kickoff-history

Retrieves kickoff history.

Query parameters:

* type

#### POST /kickoff-history

Saves a generated kickoff.

Request body:

``` json
{
  "homeTeam": "Team A",
  "awayTeam": "Team B",
  "type": "club-ratings"
}
```

#### DELETE /kickoff-history

Deletes all kickoff history entries.

#### DELETE /kickoff-history/:id

Deletes a single kickoff history entry by ID.

⸻

## Error Handling

The API uses standard HTTP status codes for errors.

Status	Meaning
400	Bad request / invalid input
404	Resource not found
500	Internal server error

Common errors include:

* Not enough teams available for the requested matchup
* Base team not found during reroll
* Invalid MongoDB ObjectId

⸻

## Database

The application uses MongoDB with the following collections:

* clubs
* countries
* kickoff-history

Club and country data is seeded into the database through the backend seed scripts.

⸻

## Installation

### Prerequisites

Make sure you have:

* Node.js installed
* A MongoDB database
* Git

Clone the repository

``` bash
git clone https://github.com/Nikolas0209/EA24-kickoff-Generator.git
cd EA24-Kickoff-Generator
```

### Backend

``` bash
cd backend
npm install
```

Create a .env file in the backend root:

```env
MONGO_URI=your_mongo_connection_string
PORT=3000
```

Start the backend:

``` bash
node src/server.js
```

### Frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

The frontend will then be available through the Vite development server.

⸻

## Environment Variables

The backend requires the following environment variables:

Variable	Description
MONGO_URI	MongoDB connection string
PORT	Port used by the Express server

Do not commit the .env file to the repository.

⸻

## Development

The frontend and backend are developed as separate applications inside the same repository.

The frontend communicates with the Express API, while the backend handles:

* Matchup generation
* Team filtering
* Rating-based matchmaking
* Team rerolling
* Kickoff history
* MongoDB access

⸻

## Future Improvements

Potential future improvements include:

* Further mobile responsiveness refinements
* Additional UI/UX refinements
* Production deployment

⸻

## Status

Completed and ready for portfolio presentation.