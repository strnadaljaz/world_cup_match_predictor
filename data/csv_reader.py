import csv


def readDataFromCsv(file_name: str) -> list:
    with open(file_name, 'r') as f:
        data = csv.DictReader(f)

        data_as_list: list = []
        for row in data:
            data_as_list.append(row)

        return data_as_list
