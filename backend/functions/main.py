from search import *
import sys
from parsing import *
import json


Parsing.ParseViolations(Parsing)
# Parsing.ObjectViolations(Parsing, sys.argv[2], null, null)
# Parsing.ListObjectViolations()
# Parsing.TimeViolations()
# print(sys.argv)
# print(search(sys.argv[1], sys.argv[2], sys.argv[3]))
simpleSearch( int(sys.argv[1]), sys.argv[2], int(sys.argv[3]))
# print(json.dumps(sys.argv))