from fastapi import FastAPI, HTTPException
from football.teams import createTeams
from xgboost import XGBClassifier
from Team import Team
from numpy import ndarray
from model.model import calculateProbabilities, explanationData
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from football.trainer import getTrainingData
from data.csv_reader import readDataFromCsv
from football.trainer import trainModel
import asyncio

MAX_REQUESTS = 2


class MatchRequest(BaseModel):
    home_team: str
    away_team: str
    neutral: bool


app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://international-match-predictor.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

teams: list[Team] = createTeams()
team_map = {team.name.lower(): team for team in teams}

matches = readDataFromCsv("results.csv")

X, Y = getTrainingData(team_map, matches)

model: XGBClassifier = trainModel(X, Y)

print("Server ready for requests")

semaphore = asyncio.Semaphore(MAX_REQUESTS)


@app.post("/probabilities")
async def probabilities(
    req: MatchRequest
):
    try:
        await asyncio.wait_for(semaphore.acquire(), timeout=1)
    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=429,
            detail="Server is busy, try again later."
        )

    try:
        probs = await asyncio.to_thread(
            calculateProbabilities,
            req.home_team,
            req.away_team,
            team_map,
            req.neutral,
            model
        )

        explanation_data = await asyncio.to_thread(
            explanationData,
            req.home_team,
            req.away_team, 
            team_map,
            model    
        )

        probs_list = probs.tolist()

        data = {
            "probabilities": {
                "home_win": probs_list[2],
                "draw": probs_list[1],
                "away_win": probs_list[0],
            },
            "explanation_data": explanation_data
        }

        return data

    finally:
        semaphore.release()
