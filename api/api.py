from fastapi import FastAPI, Request
from football.teams import createTeams
from xgboost import XGBClassifier
from Team import Team
from numpy import ndarray
from model.model import calculateProbabilities, loadModel
import json
import codecs


class matchInfo:
    def __init__(self, home: str, away: str, neutral: bool):
        self.home = home
        self.away = away
        self.bool = bool


app: FastAPI = FastAPI()

teams: list[Team] = createTeams()
team_map = {team.name.lower(): team for team in teams}

model: XGBClassifier = loadModel("model.json")

print("Server ready for requests")


@app.get("/probabilities")
async def probabilities(
    home: str,
    away: str,
    neutral: bool
):
    probs: ndarray = calculateProbabilities(home, away,
                                            team_map, neutral, model)

    probs_list = probs.tolist()

    data = {
        "home_win": probs_list[2],
        "draw": probs_list[1],
        "away_win": probs_list[0]
    }

    return data
