import csv


def getFifaRank(nation: str) -> int:
    with open("fifa_rankings.csv", "r") as file:
        data = csv.DictReader(file)
        for row in data:
            if row["Country"].lower() == nation.lower():
                return int(row["Rank"])

    return -1
