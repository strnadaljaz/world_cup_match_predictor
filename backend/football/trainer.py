from Team import Team
import xgboost as xgb
import pandas as pd
from numpy import average
from sklearn.metrics import accuracy_score


def getK(tournament: str):
    if tournament == "FIFA World Cup":
        return 60

    if "qualification" in tournament.lower():
        return 40

    if "uefa euro" in tournament.lower():
        return 50

    return 20


def getTrainingData(team_map, matches: list) -> tuple[list, list]:
    X = []
    Y = []

    for match in matches:
        home_team: str = match['home_team'].lower()
        away_team: str = match['away_team'].lower()
        home_score: int = int(match['home_score'])
        away_score: int = int(match['away_score'])
        neutral: bool = match['neutral']

        home_team_object: Team = team_map.get(home_team)
        away_team_object: Team = team_map.get(away_team)

        if home_team_object is None or away_team_object is None:
            continue

        home_elo = home_team_object.elo
        away_elo = away_team_object.elo

        home_form = (
            sum(home_team_object.form) / len(home_team_object.form)
            if len(home_team_object.form) > 0
            else 0.5
        )

        away_form = (
            sum(away_team_object.form) / len(away_team_object.form)
            if len(away_team_object.form) > 0
            else 0.5
        )

        if not neutral:
            home_elo += 100

        elo_diff = home_elo - away_elo

        home_goals_scored = (
            average(home_team_object.goals_scored)
            if len(home_team_object.goals_scored)
            else 0
        )

        away_goals_scored = (
            average(away_team_object.goals_scored)
            if len(away_team_object.goals_scored)
            else 0
        )

        home_goals_received = (
            average(home_team_object.goals_received)
            if len(home_team_object.goals_received)
            else 0
        )

        away_goals_received = (
            average(away_team_object.goals_received)
            if len(away_team_object.goals_received)
            else 0
        )

        home_goal_diff = home_goals_scored - home_goals_received
        away_goal_diff = away_goals_scored - away_goals_received

        row = {
            "home_elo": home_elo,
            "away_elo": away_elo,
            "elo_diff": elo_diff,
            "home_form": home_form,
            "away_form": away_form,
            "neutral": 0 if match['neutral'] == 'FALSE' else 1,
            "home_goal_diff": home_goal_diff,
            "away_goal_diff": away_goal_diff,
        }

        X.append(row)

        Eh = 1 / (1 + pow(10, (away_elo - home_elo) / 400))
        Ea = 1 - Eh

        if home_score > away_score:
            Sh = 1
            Sa = 0
            target = 2
        elif home_score == away_score:
            Sh = 0.5
            Sa = 0.5
            target = 1
        else:
            Sh = 0
            Sa = 1
            target = 0

        Y.append(target)

        goalDiff = abs(home_score - away_score)

        if goalDiff == 2:
            multiplier = 1.5
        elif goalDiff >= 3:
            multiplier = 1.75
        else:
            multiplier = 1

        K = getK(match["tournament"])

        home_team_object.elo += K * multiplier * (Sh - Eh)
        away_team_object.elo += K * multiplier * (Sa - Ea)

        if len(home_team_object.form) >= 30:
            del home_team_object.form[0]
            del home_team_object.goals_scored[0]
            del home_team_object.goals_received[0]
        if len(away_team_object.form) >= 30:
            del away_team_object.form[0]
            del away_team_object.goals_scored[0]
            del away_team_object.goals_received[0]

        home_team_object.form.append(Sh)
        away_team_object.form.append(Sa)
        home_team_object.goals_scored.append(home_score)
        home_team_object.goals_received.append(away_score)
        away_team_object.goals_scored.append(away_score)
        away_team_object.goals_received.append(home_score)

    return X, Y


def trainModel(X, Y) -> xgb.XGBClassifier:
    df = pd.DataFrame(X)

    split = int(len(df) * 0.8)
    X_train = df.iloc[:split]
    X_test = df.iloc[split:]

    Y_train = Y[:split]
    Y_test = Y[split:]

    model = xgb.XGBClassifier(
        objective="multi:softprob",
        num_class=3,
        max_depth=4,
        learning_rate=0.02,
        n_estimators=500,
        random_state=42,
        subsample=0.8,
        colsample_bytree=0.8,
        min_child_weight=3,
        gamma=0.1
    )

    model.fit(X_train, Y_train)

    Y_pred = model.predict(X_test)

    accuracy = round(accuracy_score(Y_test, Y_pred) * 100, 2)

    print(f'Model accuracy: {accuracy}%')

    return model
