class Team:
    def __init__(self, name: str, elo: int, fifa_rank: int, form: list[float], goals_scored: list[int], goals_received: list[int]):
        self.name = name
        self.elo = elo
        self.fifa_rank = fifa_rank
        self.form = form
        self.goals_scored = goals_scored
        self.goals_received = goals_received

    def toString(self) -> str:
        return f'{self.name}, {self.elo}, {self.fifa_rank}, {self.form}, {self.goals_scored}, {self.goals_received}'
