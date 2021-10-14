from search import *
import sys
from parsing import *
import json


# Parsing.ParseViolations(Parsing)
# Parsing.ObjectViolations()
# Parsing.ListObjectViolations()
# Parsing.TimeViolations()

search(sys.argv[1], sys.argv[2], sys.argv[3])

# print(json.dumps(sys.argv))