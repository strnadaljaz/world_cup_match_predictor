from fastapi import FastAPI
from football.teams import createTeams
from xgboost import XGBClassifier
from Team import Team
from numpy import ndarray
from model.model import calculateProbabilities, loadModel
import json
import codecs

app: FastAPI = FastAPI()

teams: list[Team] = createTeams()
team_map = {team.name: team for team in teams}

model: XGBClassifier = loadModel("model.json")

print("Server ready for requests")


@app.get("/probabilities")
async def probabilities():
    home_team = "Argentina"
    away_team = "Slovenia"

    neutral = False

    probs: ndarray = calculateProbabilities(home_team, away_team,
                                            team_map, neutral, model)

    probs_list = probs.tolist()

    data = {
        "home_win": probs_list[2],
        "draw": probs_list[1],
        "away_win": probs_list[0]
    }

    return data
