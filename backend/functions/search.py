

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
        page = "datasets/parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv"
    elif (pnum == 2):
        page = "datasets/parking-violations-issued-fiscal-year-2016.csv"
    elif (pnum == 3):
        page = "datasets/parking-violations-issued-fiscal-year-2018.csv"
    else:
        return 0

    result = []

    with open (f"datasets/{page}") as f:
        content = f.readlines()
        line1 = f.readline()

    # If there are no columns to search for return 0
    if (len(colNames) == 0):
        return 0

    # Get the column indices of all the columns passed to the function
    colIndices = []
    line = line1.split(',')
    for col in colNames:
        for val in line:
            if (val == col):
                colIndices.append(line.index(val))
                break

    searchColumn = []
    for col in colNames:
        # If the search parameters are empty then just add the first 10 rows to the given column
        if (len(searchParam) == 0):
            for line in content:
                lineList = line.split(',')
                