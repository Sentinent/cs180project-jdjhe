


# import "../../data_structures/parsing.py"
# import "search.py"
import sys
import json

def call()  :
    print("sys: ")
    print(sys.argv)
    return "python test code ran"

value = {
    "language" : "english",
    "name" : "justin",
    "price" : 45
}

data = [['first name', 'last name'],['Diane', 'Shan'],['Ethan','Bayer'],['Heng','Tan'],['Jason','Lin'],['Justin','Pham']]



print (json.dumps(value))
# print (69)
# print(json.dumps(data))