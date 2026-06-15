from getNations import getNations, readMatches, writeToCsv
from Team import Team


def createTeams() -> list[Team]:
    nations: list = getNations()

    teams: list[Team] = []

    for nation in nations:
        teams.append(Team(nation["Country"], 1500, nation["Rank"], [], 0, 0))

    return teams


def getK(tournament: str):
    if tournament == "FIFA World Cup":
        return 60

    if "qualification" in tournament.lower():
        return 40

    if "uefa euro" in tournament.lower():
        return 50

    return 20


def getTrainingData(teams: list[Team], matches: list):
    X = []
    Y = []
    teamMap = {team.name: team for team in teams}

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

        row = {
            "date": match["date"],
            "home_elo": homeElo,
            "away_elo": awayElo,
            "elo_diff": eloDiff,
            "home_form": homeForm,
            "away_form": awayForm,
            "neutral": bool(match["neutral"].capitalize())
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

        if len(homeTeamObject.form) >= 5:
            del homeTeamObject.form[0]
        if len(awayTeamObject.form) >= 5:
            del awayTeamObject.form[0]

        homeTeamObject.form.append(Sh)
        awayTeamObject.form.append(Sa)

    return X, Y


def main():

    teams: list[Team] = createTeams()
    matches = readMatches()

    X, Y = getTrainingData(teams, matches)

    # writeToCsv(teams)


main()
