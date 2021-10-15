import copy
import json

def find_title(list, index):
    for val in list:
        if (val == index):
            return list.index(val)
    return -1

def parsing_json():

    violation = {
    "Summons Number": "123456789",
    "Plate ID": "FCJ5493",
    "Registration": "NY",
    "Issue Date": "1970-12-18T00:00:00.000",
    "Violation Time": "0358A",
    "Violation Code": 20,
    "Vehicle Make": "GMC",
    "Vehicle Body Type": "SUBN",
    "Vehicle Year": "2013",
    "Street Name": "E 5 ST",
    "County": "K",
    }

    pnum = 1
    while pnum < 2:
        if (pnum == 1):
            page = "parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv"
        elif (pnum == 2):
            page = "parking-violations-issued-fiscal-year-2016.csv"
        elif (pnum == 3):
            page = "parking-violations-issued-fiscal-year-2018.csv"
        else:
            return 0
    
        result = []

        with open (f"datasets/{page}") as f:
            titles = f.readline()

        with open (f"datasets/{page}") as file:
            content = file.readlines()

        lineOne = titles.split(',')
        titleIndexList = [0, 1, 2, 4, 19, 5, 7, 6, 35, 24, 21]

        skipL1 = 0
        for line in content:
            lineList = line.split(',')
            if (skipL1 > 0):
                violation["Summons Number"] = lineList[0]
                violation["Plate ID"] = lineList[1]
                violation["Registration State"] = lineList[2]
                violation["Issue Date"] = lineList[4]
                violation["Violation Time"] = lineList[19]
                violation["Violation Code"] = lineList[5]
                violation["Vehicle Make"] = lineList[7]
                violation["Vehicle Body Type"] = lineList[6]
                violation["Vehicle Year"] = lineList[35]
                violation["Street Name"] = lineList[24]
                violation["Violation County"] = lineList[21]

                result.append(copy.deepcopy(violation))
            skipL1 += 1

        pnum += 1

    jsonString = json.dumps(result, indent = 4)
    jsonFile = open("parsed_data/data.json", "w")
    jsonFile.write(jsonString)
    jsonFile.close()
                    

    


    