

def search(pnum, colNames, searchParam):
    """
    Function to search for specific columns and parameters for a given csv dataset
    - psize is the amount of cells within the column 
    - pnum is the page of data to search through 
    - colNames is a list of column titles to find
    - searchParam is the list of search parameters for a column
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
        
    
    return result
                