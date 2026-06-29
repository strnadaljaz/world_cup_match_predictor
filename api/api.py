from fastapi import FastAPI
from football.teams import createTeams
from xgboost import XGBClassifier
from Team import Team
from numpy import ndarray
from model.model import calculateProbabilities
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from football.trainer import getTrainingData
from data.csv_reader import readDataFromCsv
from football.trainer import trainModel


class MatchRequest(BaseModel):
    home_team: str
    away_team: str
    neutral: bool


app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

teams: list[Team] = createTeams()
team_map = {team.name.lower(): team for team in teams}

matches = readDataFromCsv("results.csv")

X, Y = getTrainingData(team_map, matches)

model: XGBClassifier = trainModel(X, Y)

print("Server ready for requests")


@app.post("/probabilities")
async def probabilities(
    req: MatchRequest
):
    probs: ndarray = calculateProbabilities(req.home_team, req.away_team,
                                            team_map, req.neutral, model)

    probs_list = probs.tolist()

    data = {
        "home_win": probs_list[2],
        "draw": probs_list[1],
        "away_win": probs_list[0]
    }

    return data
