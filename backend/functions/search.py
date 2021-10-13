
import json


def simpleSearch(pnum, col, row):
    """
    Quick Search Function to find a particular set of rows in a given column
    """
    psize = 10

    # Determine the file based on the given page number
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
        content = f.readlines()

    index = 0
    searchRow = 0
    end = 0
    endSearch = 0

    for val in content:
        lineL = val.split(',')
        for l in lineL:
            if (l == col):
                colIndex = lineL.index(l)
                break
        break



    for line in content:
        lineList = line.split(',')
        if (index == 0):
            result.append(lineList[colIndex])
        else:
            if (endSearch == 1):
                end += 1
                result.append(lineList[colIndex])
            if (searchRow == row - 1):
                result.append(lineList[colIndex])
                endSearch = 1
            if (end >= psize):
                break
        searchRow += 1
        index += 1
    
    print(json.dumps(result))


def search(pnum, colNames, searchList):
    """
    Function to search for specific columns and parameters for a given csv dataset
    - psize is the amount of cells within the column 
    - pnum is the page of data to search through 
    - colNames is a list of column titles to find
    - searchParam is the list of search parameters for a column
    """
    psize = 10
    searchParam = searchList

    # Determine the file based on the given page number
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
        content = f.readlines()

    # If there are no columns to search for return 0
    if (len(colNames) == 0):
        return 0

    # Get the column indices of all the columns passed to the function
    colIndices = []
    for col in colNames:
        for val in content:
            lineL = val.split(',')
            for l in lineL:
                if (l == col):
                    colIndices.append(lineL.index(l))
                    break
            break


    # Cycle through Column index list and store all values in a list of columns
    searchColumn = []
    for col in colIndices:
        # If the search parameters are empty then just add the first 10 rows to the desired columns
        # Count from zero to page size for desired column output size
        # Skip the first line of the file due to column titles
        # After storing column data, store that column in a seperate list
        index = 0
        if (len(searchParam) == 0):
            skipL1 = 0
            searchColumn.append(lineL[col])
            for line in content:
                if (skipL1 > 0):
                    lineList = line.split(',')
                    searchColumn.append(lineList[col])
                    if (index >= psize):
                        break
                    index += 1
                skipL1 += 1
            result.append(searchColumn[:])
            searchColumn.clear()
            index = 0
        # If the search list is not empty then assume that each search paramter corresponds to its respective column
        else:
            skipL1 = 0
            searchColumn.append(lineL[col])
            endSearch = 1
            end = 0
            # Then traverse through all the rows in the data set 
            for line in content:
                # Skip first row
                if (skipL1 > 0):
                    lineList = line.split(',')
                    # If we have already found the desired value, increment the end counter and add a value to our new found search list
                    if (endSearch == 0):
                        end += 1
                        searchColumn.append(lineList[col])
                    # If we find the value, begin the end of the loop process
                    # by beginning end counter to reach the desired page size
                    # Then if we have already found the value and find it again simply increment end counter by 1 to compensate
                    if (lineList[col] == searchParam[0]):
                        searchColumn.append(lineList[col])
                        if (endSearch == 0):
                            end += 1
                        endSearch = 0
                    # Once the end counter finishes, end the loop
                    if (end >= psize):
                        break
                skipL1 += 1
            # If we have a found search list that has more than the title, add it to the result list
            if (len(searchColumn) > 1):
                result.append(searchColumn[:])
            searchColumn.clear()
            index = 0
            searchParam.pop(0)

    # If nothing was able to be put in the result list return 0 to indicate failure
    if (len(result) == 0):
        return 0

    return (json.dumps(result))
                