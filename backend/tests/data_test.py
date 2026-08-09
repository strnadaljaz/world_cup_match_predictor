import pytest
from data.csv_reader import readDataFromCsv
from football.teams import createTeams


def test_read_data_from_csv():
    data = readDataFromCsv("fifa_rankings.csv")

    assert len(data) != 0


def test_create_teams():
    teams = createTeams()

    assert len(teams) != 0