from Team import Team
from data.csv_reader import readDataFromCsv
from football.teams import createTeams
from football.trainer import getTrainingData, trainModel
from model.model import saveModel, loadModel, calculateProbabilities
import xgboost as xgb
from numpy import ndarray


def main():
    choice = -1
    model_file = None

    teams: list[Team] = createTeams()
    team_map = {team.name.lower(): team for team in teams}
    while (choice != 3):
        print("1. train and save model")
        print("2. Use model")
        print("3. quit")
        choice = int(input("Choice: "))

        if choice == 1:
            print("Training model...")

            matches = readDataFromCsv("results.csv")

            X, Y = getTrainingData(team_map, matches)

            model: xgb.XGBClassifier = trainModel(X, Y)

            model_file = input("Enter file name to save the model: ")

            saveModel(model, model_file)
        elif choice == 2:
            if (model_file is None):
                model_file = input("Enter file name to load the model: ")

            model = loadModel(model_file)

            home_team = input("Enter home team name: ")
            away_team = input("Enter away team name: ")

            neutral = bool(
                input("Is match on neutral ground (1 for yes, 0 for no)? "))

            probs: ndarray = calculateProbabilities(home_team, away_team,
                                                    team_map, neutral, model)

            print(f'Probs:\n - {home_team} win: {round(probs[2] * 100)}% \n - draw: {
                round(probs[1] * 100)}% \n - {away_team} win: {round(probs[0] * 100)}%')


if __name__ == "__main__":
    main()
