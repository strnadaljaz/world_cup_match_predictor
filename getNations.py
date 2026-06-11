import csv


def getNations() -> list:
    with open("fifa_rankings.csv", "r") as file:
        data = csv.DictReader(file)

        nations: list = []
        for row in data:
            nations.append(row)

        return nations
