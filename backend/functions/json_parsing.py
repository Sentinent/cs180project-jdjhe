import copy
import json

"""
Function to collect desired data through the given csv datasets
"""
def parsing_json():

    # Dictionary Object to hold the data needed from the datasets
    violation = {
    "Summons Number": "123456789",
    "Plate ID": "FCJ5493",
    "Registration State": "NY",
    "Issue Date": "1970-12-18T00:00:00.000",
    "Violation Time": "0358A",
    "Violation Code": 20,
    "Vehicle Make": "GMC",
    "Vehicle Body Type": "SUBN",
    "Vehicle Year": "2013",
    "Street Name": "E 5 ST",
    "County County": "K",
    }

    # pnum is an indicator for what page of data to read from
    pnum = 1

    fileNumber = 1

    # The While loop is looping through the multiple datasets to be parsed
    while pnum < 4:

        # Determine which dataset to read through based on pnum
        if (pnum == 1):
            page = "parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv"
        elif (pnum == 2):
            page = "parking-violations-issued-fiscal-year-2016.csv"
        elif (pnum == 3):
            page = "parking-violations-issued-fiscal-year-2018.csv"
        else:
            return 0
    
        # A list to hold the many dictionary objects
        result = []

        # Opening up the desired dataset
        with open (f"../datasets/{page}") as file:
            content = file.readlines()

        # Desired Columns
        #titleIndexList = [0, 1, 2, 4, 19, 5, 7, 6, 35, 24, 21]

        # skipL1 is an index counter intended to skip the first line which holds the titles 
        skipL1 = 0
        # Read through each line in the given dataset 
        for line in content:
            try:
                # Turn the given line into a list to be manipulated
                lineList = line.split(',')
                if (skipL1 > 0):
                    # Assign the right values to the base dictionary object
                    violation["Summons Number"] = lineList[0]
                    violation["Plate ID"] = lineList[1]
                    violation["Registration State"] = lineList[2]
                    violation["Issue Date"] = lineList[4]
                    violation["Violation Time"] = lineList[19]
                    violation["Violation Code"] = int(lineList[5])
                    violation["Vehicle Make"] = lineList[7]
                    violation["Vehicle Body Type"] = lineList[6]
                    violation["Vehicle Year"] = lineList[35]
                    violation["Street Name"] = lineList[24]
                    violation["Violation County"] = lineList[21]

                    # Append a copy of the dictionary to the final list of dictionary objects 
                    result.append(copy.deepcopy(violation))

                    # Write the list of violation dictionary objects to a json object
                    if (len(result) >= 1200000):
                        jsonString = json.dumps(result, indent = 4)
                        jsonFile = open(f"../parsed_data/data{fileNumber}.json", "w")
                        jsonFile.write(jsonString)
                        jsonFile.close()
                        result.clear()
                        fileNumber += 1
                skipL1 += 1
            except:
                pass


        jsonString = json.dumps(result, indent = 4)
        jsonFile = open(f"../parsed_data/data{fileNumber}.json", "w")
        jsonFile.write(jsonString)
        jsonFile.close()
        result.clear()
        fileNumber += 1

        # Increment the page counter
        pnum += 1
    


    