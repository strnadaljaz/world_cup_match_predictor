import requests
import json
import pytest

def test_api():
    URL = "https://strnadserver.pike-solfege.ts.net/api/probabilities"

    PARAMS = {
        "home_team": "argentina",
        "away_team": "brazil",
        "neutral": False,
    }

    response = requests.post(URL, json = PARAMS, headers = {"Content-type": "application/json"})

    assert response.status_code == 200 

    DATA = json.loads(response.text)

    PROBABILITES = DATA["probabilities"]
    EXPLANATION_DATA = DATA["explanation_data"]

    assert "home_win" in PROBABILITES
    assert "away_win" in PROBABILITES
    assert "draw" in PROBABILITES

    assert "home_goal_diff" in EXPLANATION_DATA
    assert "away_goal_diff" in EXPLANATION_DATA
    assert "home_form" in EXPLANATION_DATA
    assert "away_form" in EXPLANATION_DATA
    assert "home_elo" in EXPLANATION_DATA
    assert "away_elo" in EXPLANATION_DATA
    assert "home_fifa_rank" in EXPLANATION_DATA
    assert "away_fifa_rank" in EXPLANATION_DATA

    assert isinstance(PROBABILITES["home_win"], float)
    assert isinstance(PROBABILITES["away_win"], float)
    assert isinstance(PROBABILITES["draw"], float)

    assert isinstance(EXPLANATION_DATA["home_goal_diff"], int)
    assert isinstance(EXPLANATION_DATA["away_goal_diff"], int)
    assert isinstance(EXPLANATION_DATA["home_form"], list)
    assert isinstance(EXPLANATION_DATA["away_form"], list)
    assert isinstance(EXPLANATION_DATA["home_elo"], int)
    assert isinstance(EXPLANATION_DATA["away_elo"], int)
    assert isinstance(EXPLANATION_DATA["home_fifa_rank"], str)
    assert isinstance(EXPLANATION_DATA["away_fifa_rank"], str)