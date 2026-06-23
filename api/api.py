from fastapi import FastApi
from football.teams import createTeams
from xgboost import XGBClassifier
from Team import Team
from numpy import ndarray
from model.model import calculateProbabilities, loadModel
import json

app: FastApi = FastApi()

teams: list[Team] = createTeams()
team_map = {team.name: team for team in teams}

model: XGBClassifier = loadModel("model.json")


@app.get("/probabilities")
async def probabilities():
    home_team = "Argentina"
    away_team = "Slovenia"

    neutral = False

    probs: ndarray = calculateProbabilities(home_team, away_team,
                                            team_map, neutral, model)

    res = json.dumps(probs)

    return res
