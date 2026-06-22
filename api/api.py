from fastapi import FastApi
from football.teams import createTeams
from data.csv_reader import readDataFromCsv
from football.trainer import getTrainingData, trainModel
from xgboost import XGBClassifier
from Team import Team
from numpy import ndarray
from model.model import calculateProbabilities
import json

app: FastApi = FastApi()

teams: list[Team] = createTeams()
team_map = {team.name: team for team in teams}

matches = readDataFromCsv("results.csv")

X, Y = getTrainingData(team_map, matches)

model: XGBClassifier = trainModel(X, Y)


@app.get("/probabilities")
async def probabilities():
    home_team = "Argentina"
    away_team = "Slovenia"

    neutral = False

    probs: ndarray = calculateProbabilities(home_team, away_team,
                                            team_map, neutral, model)

    res = json.dumps(probs)

    return res
