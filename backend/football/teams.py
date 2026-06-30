from Team import Team
from data.csv_reader import readDataFromCsv


def createTeams() -> list[Team]:
    nations: list = readDataFromCsv("fifa_rankings.csv")

    teams: list[Team] = []

    for nation in nations:
        teams.append(Team(nation["Country"], 1500, nation["Rank"], [], [], []))

    return teams
