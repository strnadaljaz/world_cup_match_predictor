from getNations import getNations


class Team:
    def __init__(self, name: str, elo: int, fifaRank: int, form: list[int], goalsScored: int, goalsReceived: int):
        self.name = name
        self.elo = elo
        self.fifaRank = fifaRank
        self.form = form
        self.goalsScored = goalsScored
        self.goalsReceived = goalsReceived

    def toString(self) -> str:
        return f'{self.name}, {self.elo}, {self.fifaRank}, {self.form}, {self.goalsScored}, {self.goalsReceived}'


def createTeams() -> list[Team]:
    nations: list = getNations()

    teams: list[Team] = []

    for nation in nations:
        teams.append(Team(nation["Country"], 1500, nation["Rank"], [], 0, 0))

    return teams


def main():

    teams: list[Team] = createTeams()

    for team in teams:
        print(team.toString())

main()
