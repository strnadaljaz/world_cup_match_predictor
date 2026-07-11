
# World Cup Match Predictor

An AI-powered football match predictor that estimates the chances of a home win, draw, or away win for international matches.

## App url
App is live on: [https://international-match-predictor.vercel.app](https://international-match-predictor.vercel.app/)

The project has two parts:

- **Backend**: a Python FastAPI service that trains an XGBoost model from historical match data and serves probability predictions.
- **Frontend**: a Next.js app that lets you pick two national teams and display the prediction as animated charts.

## Features

- Predicts **home win**, **draw**, and **away win** probabilities
- Supports a large list of national teams
- Optional **neutral ground** input
- Animated doughnut charts for results in the UI

## Project structure

```text
backend/        Python API, model training, CSV data, and backend tests
web-interface/  Next.js frontend and UI tests
```

## Requirements

- Node.js 18+
- Python 3.12+
- npm

## Backend setup

The backend uses the Python dependencies listed in `backend/requirements.txt`.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the API with Uvicorn:

```bash
uvicorn api.api:app --reload
```

The service exposes:

- `POST /probabilities`

Example request:

```json
{
  "home_team": "argentina",
  "away_team": "brazil",
  "neutral": false
}
```

Example response:

```json
{
  "home_win": 0.52,
  "draw": 0.24,
  "away_win": 0.24
}
```

## Frontend setup

```bash
cd web-interface
npm install
npm run dev
```

By default the frontend calls the hosted backend at:

```text
https://strnadserver.pike-solfege.ts.net/api/probabilitis
```
This point is available only for my hosted frontend, so for you it won't work. It doesn't accept requests from other IP's, because it would be to much for my home server.

To point the UI at a different API, set:

```bash
NEXT_PUBLIC_LINK=http://localhost:8000/probabilities
```

## Running tests

From the repository root:

```bash
npm test
```

Or run each package separately:

```bash
npm run test:backend
npm run test:frontend
```

## Data and model

The backend trains on the CSV files in `backend/`, including:

- `results.csv`
- `fifa_rankings.csv`

Team state is built from historical data, then an XGBoost classifier is trained to produce match outcome probabilities.

## Notes

- The backend API is CORS-enabled for the frontend.
- The UI validates that both teams are selected and that the home and away teams are different.
