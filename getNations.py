import csv
from Team import Team


def getNations() -> list:
    with open("fifa_rankings.csv", "r") as file:
        data = csv.DictReader(file)

        nations: list = []
        for row in data:
            nations.append(row)

        return nations


def writeToCsv(teams: list[Team]):
    with open('file.csv', 'w') as f:

        writer = csv.writer(f)

        header: list[str] = ['name', 'elo', 'fifaRank',
                             'form', 'goalsScored', 'goalsReceived']

        writer.writerow(header)

        for team in teams:
            row: list[str] = [str(team.name), str(team.elo), str(team.fifaRank), str(
                team.form), str(team.goalsScored), str(team.goalsReceived)]
            writer.writerow(row)


def readMatches() -> list:
    with open("results.csv", 'r') as f:
        data = csv.DictReader(f)

        matches: list = []
        for row in data:
            matches.append(row)

        return matches
