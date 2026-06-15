class Team:
    def __init__(self, name: str, elo: int, fifaRank: int, form: list[float], goalsScored: list[int], goalsReceived: list[int]):
        self.name = name
        self.elo = elo
        self.fifaRank = fifaRank
        self.form = form
        self.goalsScored = goalsScored
        self.goalsReceived = goalsReceived

    def toString(self) -> str:
        return f'{self.name}, {self.elo}, {self.fifaRank}, {self.form}, {self.goalsScored}, {self.goalsReceived}'
