import xgboost as xgb
from numpy import average
import pandas as pd
from numpy import ndarray


def calculateProbabilities(home_team: str, away_team: str, team_map: dict, neutral: bool, model: xgb.XGBClassifier) -> ndarray:
    home = team_map[home_team]
    away = team_map[away_team]

    home_form = average(home.form)
    away_form = average(away.form)

    home_goals_scored = (
        average(home.goals_scored)
        if len(home.goals_scored)
        else 0
    )

    away_goals_scored = (
        average(away.goals_scored)
        if len(away.goals_scored)
        else 0
    )

    home_goals_received = (
        average(home.goals_received)
        if len(home.goals_received)
        else 0
    )

    away_goals_received = (
        average(away.goals_received)
        if len(away.goals_received)
        else 0
    )

    home_goal_diff = home_goals_scored - home_goals_received
    away_goal_diff = away_goals_scored - away_goals_received

    match_input = pd.DataFrame([{
        "home_elo": home.elo,
        "away_elo": away.elo,
        "elo_diff": home.elo - away.elo,
        "home_form": home_form,
        "away_form": away_form,
        "neutral": neutral,  # ali 0/1
        "home_goal_diff": home_goal_diff,
        "away_goal_diff": away_goal_diff
    }])

    probs = model.predict_proba(match_input)[0]

    return probs


# Gets the data for the explanation of the probabilities
def explanationData(home_team: str, away_team: str, team_map: dict, model: xgb.XGBClassifier) -> map:
    home = team_map[home_team]
    away = team_map[away_team]

    # Take only last five matches
    index = len(home.goals_scored) - 5

    home_goal_diff: int = sum(home.goals_scored[index:]) - sum(home.goals_received[index:])
    away_goal_diff: int = sum(away.goals_scored[index:]) - sum(away.goals_received[index:])

    data = {
        "home_goal_diff": home_goal_diff,
        "away_goal_diff": away_goal_diff,
        "home_form": home.form[index:],
        "away_form": away.form[index:],
        "home_elo": home.elo,
        "away_elo": away.elo,
        "home_fifa_rank": home.fifa_rank,
        "away_fifa_rank": away.fifa_rank
    }

    return data


def saveModel(model: xgb.XGBClassifier, file_name: str):
    model.save_model(file_name)


def loadModel(fileName: str) -> xgb.XGBClassifier:
    model = xgb.XGBClassifier()
    model.load_model(fileName)
    return model
