
#from data_structures.violation_objects import *
from violation_objects import *

class Parsing:
    #############################################################################
    # Function to parse the total amount of Violations occuring in the data sheet
    def ParseViolations(self):
        violationsList = []

        """
        Set the sise of the list to 99 by appending 99 0's to it
        This is done so that the index of the list represents the Violation Code from the data set
        """
        for zero in range(99):
            violationsList.append(0)

        #with open('../datasets/parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv', encoding='utf-8', newline='') as file:
            #reader = enumerate(csv.reader(file))
        with open('../datasets/parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv') as f:
            content = f.readlines()
        

            """
            Read through the data and using the data with a 
            given data cell as the index for the list to increment 
            its violation count
            """
            index = 0
            for line in content:
                if index > 0:
                    lineList = line.split(',')
                    var = lineList[5]
                    if (var.isnumeric()):
                        violationsList[int(var) - 1] += 1
                index += 1

        writeFile = open("../parsed_data/ViolationCounts.csv", "w")

        writeFile.write("Violation Code,")
        writeFile.write("Counts,\n")

        # Write all of the saved data to the workbook
        index = 1
        for v in violationsList:
            writeFile.write(str(index) + ",")
            writeFile.write(str(v) + ",\n")
            index += 1

        # Save the new workbook as a file
        writeFile.close()
    
    #######################################################################
    # Function to collect the amount of times an object has had a violation
    def ObjectViolations(self, col, objectName, saveFile):
        list = []
        lineList = []
        with open('../../datasets/parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv') as file:
            content = file.readlines()

            """
            If the data in the given cell from the data sheet is in the list
            then simply add 1 to its violation count
            otherwise add it to the list
            """
            index = 0
            check = 1
            for line in content:
                if (index > 0):
                    lineList = line.split(',')
                    for val in list:
                        if (val.object == lineList[col]):
                            val.violation += 1
                            check = 0
                            break
                    if (check):
                        list.append(ViolationObject(1, lineList[col]))
                    check = 1
                index += 1

            writeFile = open(f"../../parsed_data/{saveFile}.csv", "w")

            writeFile.write(f"{objectName},")
            writeFile.write("Violation Counts,\n")

            # Write the data to a file to be saved
            for v in list:
                writeFile.write(str(v.object) + ",")
                writeFile.write(str(v.violation) + ",\n")

            # Save the new file
            writeFile.close()

    ######################################################################################
    # Function to get the types of violations with their respective counts with another object associated with it such as counties
    def ListObjectViolations(self, col, objectName, saveFile):
        list = []
        lineList = []
        with open('../../datasets/parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv') as file:
            content = file.readlines()

            """
            Read through the desired Data Column and if we encounter a new value add it to the list
            If the value is already in the list, then find the associated violation for that value 
            and add it to the value's sublist of violations with their counts
            """
            check = 1
            index = 0
            for line in content:
                if (index > 0):
                    lineList = line.split(',')
                    for val in list:
                        if (val.primaryObject == lineList[col]):
                            if (lineList[5].isnumeric()):
                                val.addListing(lineList[5])
                            check = 0
                            break
                    if (check == 1):
                        list.append(ObjectListViolations(lineList[col]))
                        if (lineList[5].isnumeric()):
                            list[len(list) - 1].addListing(lineList[5])
                    check = 1
                index += 1 

            writeFile = open(f"../../parsed_data/{saveFile}.csv", "w")

            writeFile.write(f"{objectName},\n")

            for v in list:
                writeFile.write(str(v.primaryObject) + ",\n")
                writeFile.write("Violation Code,")
                for j in v.list:
                    writeFile.write(str(j.object) + ",")
                writeFile.write("\nViolation Count,")
                for j in v.list:
                    writeFile.write(str(j.violation) + ",")
                writeFile.write("\n")

            writeFile.close()

    # Function to parse data to collect the number of violations occuring at a given time
    def TimeViolations(self, objectName, saveFile):
        list = []
        lineList = []
        with open('../../datasets/parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv') as file:
            content = file.readlines()

            # Read through the time column
            # Save the value as a string then check to see if it is in the form 0000A
            # If the first character is either 0 or 1 then it is a valid time entry, so save the hour as a string variable
            # Otherwise set the string variable to "Unclear Time"
            # Then store it in the list if it is not present, while if it is there then add 1 to the violation count 
            time = ""
            index = 0
            for line in content:
                if (index > 0):
                    lineList = line.split(',')
                    timeWord = str(lineList[19])
                    if (len(timeWord) >= 5):
                        if (timeWord[0] == "1" or timeWord[0] == "0"):
                            time = timeWord[0] + timeWord[1] + timeWord[4] + "M"
                        else:
                            time = "Unclear Time"
                    else:
                        time = "Unclear Time"

                    true = findObject(list, time)
                    if (true != -1):
                        list[true].violation += 1
                    else:
                        list.append(ViolationObject(1, time))
                index += 1

            writeFile = open(f"../../parsed_data/{saveFile}.csv", "w")

            writeFile.write(f"{objectName},")
            writeFile.write("Violation Counts,\n")

            # Write the data to a file to be saved
            for v in list:
                writeFile.write(str(v.object) + ",")
                writeFile.write(str(v.violation) + ",\n")

            # Save the new file
            writeFile.close()
