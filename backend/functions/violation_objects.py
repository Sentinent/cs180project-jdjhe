

def findObject(list, object):
    index = 0
    for i in list:
        if (i.object == object):
            return index
        index = index + 1
    return -1

# A class to hold an Object with an associated Violation Count
class ViolationObject:
    def __init__(self, v, o):
        self.violation = v      # The Violation count for an associated Object
        self.object = o         # The Object (such as Car Brand or Violation Type) which is associated with the Violation counts

# A class to represent an object which as a primary object with a list of sub objects that have violation counts 
# Example: primary object is Month, a sub object would be a Bus Stop violation which has the number of times it occured within the month
class ObjectListViolations:
    def __init__(self, o):
        self.primaryObject = o  # An object (such as month or county) which is associated with a list of sub objects with violation counts
        self.list = []          # A list of Objects (such as Car brand) which have violation counts

    # Function to add a ViolationObject to the listing or increment the violations in the list if it already there
    def addListing(self, o):
        true = findObject(self.list, o)
        if (true != -1):
            self.list[true].violation += 1
        else:
            self.list.append(ViolationObject(1, o))

    # Function to return a given value in the list for the user or 0 otherwise
    def getListing(self, i):
        return self.list[i]

    
