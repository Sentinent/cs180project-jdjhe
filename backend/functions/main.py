from search import *
import sys
from parsing import *
import json


Parsing.ParseViolations(Parsing)
# Parsing.ObjectViolations(Parsing, sys.argv[2], null, null)
# Parsing.ListObjectViolations()
# Parsing.TimeViolations()

print(json.dumps(search(sys.argv[1], sys.argv[2], sys.argv[3])))
# print(simpleSearch(sys.argv[1], sys.argv[2],sys.argv[3]))
# print(json.dumps(sys.argv))