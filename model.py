from getFifaRank import getFifaRank


class Team:
    # form bo list intigerjev
    def __init__(self, elo: int, fifaRank: int, form: list[int], goalsScored: int, goalsReceived: int):
        self.elo = elo
        self.fifaRank = fifaRank
        self.form = form
        self.goalsScored = goalsScored
        self.goalsReceived = goalsReceived


def createTeam(teamName: str):
    fifaRank = getFifaRank(teamName)

    return Team(0, fifaRank, [0], 0, 0)


def main():
    team1Name: str = input("Enter first team: ")
    team2Name: str = input("Enter second team: ")

    team1: Team = createTeam(team1Name)
    team2: Team = createTeam(team2Name)

    print(team1)
    print(team2)


main()
