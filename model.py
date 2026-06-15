from numpy import average
from getNations import getNations, readMatches, writeToCsv
from Team import Team
import xgboost as xgb
import pandas as pd
from sklearn.metrics import accuracy_score


def main():

    teams: list[Team] = createTeams()
    teamMap = {team.name: team for team in teams}

    matches = readMatches()

    X, Y = getTrainingData(teamMap, matches)

    trainAndSaveModel(X, Y)

    loaded_model = xgb.XGBClassifier()
    loaded_model.load_model('model.json')

    homeTeam = input("Enter home team name: ")
    awayTeam = input("Enter away team name: ")

    neutral = int(input("Is match on neutral ground (1 for yes, 0 for no)? "))

    home = teamMap[homeTeam]
    away = teamMap[awayTeam]

    homeForm = average(home.form)
    awayForm = average(away.form)

    homeGoalsScored = (
        average(home.goalsScored)
        if len(home.goalsScored)
        else 0
    )

    awayGoalsScored = (
        average(away.goalsScored)
        if len(away.goalsScored)
        else 0
    )

    homeGoalsReceived = (
        average(home.goalsReceived)
        if len(home.goalsReceived)
        else 0
    )

    awayGoalsReceived = (
        average(away.goalsReceived)
        if len(away.goalsReceived)
        else 0
    )

    homeGoalDiff = homeGoalsScored - homeGoalsReceived
    awayGoalDiff = awayGoalsScored - awayGoalsReceived

    match_input = pd.DataFrame([{
        "home_elo": home.elo,
        "away_elo": away.elo,
        "elo_diff": home.elo - away.elo,
        "home_form": homeForm,
        "away_form": awayForm,
        "neutral": neutral,  # ali 0/1
        "home_goal_diff": homeGoalDiff,
        "away_goal_diff": awayGoalDiff
    }])

    probs = loaded_model.predict_proba(match_input)[0]

    print(f'Probs:\n - {homeTeam} win: {round(probs[2] * 100)}% \n - draw: {
          round(probs[1] * 100)}% \n - {awayTeam} win: {round(probs[0] * 100)}%')


def trainAndSaveModel(X, Y):
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

    print(f'{accuracy}%')

    model.save_model("model.json")


def createTeams() -> list[Team]:
    nations: list = getNations()

    teams: list[Team] = []

    for nation in nations:
        teams.append(Team(nation["Country"], 1500, nation["Rank"], [], [], []))

    return teams


def getK(tournament: str):
    if tournament == "FIFA World Cup":
        return 60

    if "qualification" in tournament.lower():
        return 40

    if "uefa euro" in tournament.lower():
        return 50

    return 20


def getTrainingData(teamMap, matches: list):
    X = []
    Y = []

    for match in matches:
        homeTeam: str = match['home_team']
        awayTeam: str = match['away_team']
        homeScore: int = int(match['home_score'])
        awayScore: int = int(match['away_score'])
        neutral: bool = match['neutral']

        homeTeamObject = teamMap.get(homeTeam)
        awayTeamObject = teamMap.get(awayTeam)

        if homeTeamObject is None or awayTeamObject is None:
            continue

        homeElo = homeTeamObject.elo
        awayElo = awayTeamObject.elo

        homeForm = (
            sum(homeTeamObject.form) / len(homeTeamObject.form)
            if len(homeTeamObject.form) > 0
            else 0.5
        )

        awayForm = (
            sum(awayTeamObject.form) / len(awayTeamObject.form)
            if len(awayTeamObject.form) > 0
            else 0.5
        )

        if not neutral:
            homeElo += 100

        eloDiff = homeElo - awayElo

        homeGoalsScored = (
            average(homeTeamObject.goalsScored)
            if len(homeTeamObject.goalsScored)
            else 0
        )

        awayGoalsScored = (
            average(awayTeamObject.goalsScored)
            if len(awayTeamObject.goalsScored)
            else 0
        )

        homeGoalsReceived = (
            average(homeTeamObject.goalsReceived)
            if len(homeTeamObject.goalsReceived)
            else 0
        )

        awayGoalsReceived = (
            average(awayTeamObject.goalsReceived)
            if len(awayTeamObject.goalsReceived)
            else 0
        )

        homeGoalDiff = homeGoalsScored - homeGoalsReceived
        awayGoalDiff = awayGoalsScored - awayGoalsReceived

        row = {
            "home_elo": homeElo,
            "away_elo": awayElo,
            "elo_diff": eloDiff,
            "home_form": homeForm,
            "away_form": awayForm,
            "neutral": 0 if match['neutral'] == 'FALSE' else 1,
            "home_goal_diff": homeGoalDiff,
            "away_goal_diff": awayGoalDiff,
        }

        X.append(row)

        Eh = 1 / (1 + pow(10, (awayElo - homeElo) / 400))
        Ea = 1 - Eh

        if homeScore > awayScore:
            Sh = 1
            Sa = 0
            target = 2
        elif homeScore == awayScore:
            Sh = 0.5
            Sa = 0.5
            target = 1
        else:
            Sh = 0
            Sa = 1
            target = 0

        Y.append(target)

        goalDiff = abs(homeScore - awayScore)

        if goalDiff == 2:
            multiplier = 1.5
        elif goalDiff >= 3:
            multiplier = 1.75
        else:
            multiplier = 1

        K = getK(match["tournament"])

        homeTeamObject.elo += K * multiplier * (Sh - Eh)
        awayTeamObject.elo += K * multiplier * (Sa - Ea)

        if len(homeTeamObject.form) >= 30:
            del homeTeamObject.form[0]
            del homeTeamObject.goalsScored[0]
            del homeTeamObject.goalsReceived[0]
        if len(awayTeamObject.form) >= 30:
            del awayTeamObject.form[0]
            del awayTeamObject.goalsScored[0]
            del awayTeamObject.goalsReceived[0]

        homeTeamObject.form.append(Sh)
        awayTeamObject.form.append(Sa)
        homeTeamObject.goalsScored.append(homeScore)
        homeTeamObject.goalsReceived.append(awayScore)
        awayTeamObject.goalsScored.append(awayScore)
        awayTeamObject.goalsReceived.append(homeScore)

    return X, Y


main()
