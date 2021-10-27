Notes:

INSERT:
http://localhost:5000/insert/summonsNum=<summons num>&plateID=<plate id>&regState=<reg state>&issDate=<issue date>&vTime=<violaion time>&vCode=<violation code>&vehMake=<car make>&vehBody=<car body type>&vehYear=<car year>&street=<street>&county=<county>

Example:
http://localhost:5000/insert/summonsNum=1366962001&plateID=63540MC&regState=NY&issDate=1971-02-02T00:00:00.000&vTime=1116A&vCode=46&vehMake=FRUEH&vehBody=DELV&vehYear=2013&street=MARINE%20AVENUE&county=K

DELETE:
http://localhost:5000/delete/summonsNum=<summons num>

Example:
http://localhost:5000/delete/summonsNum=5070559278

UPDATE:
http://localhost:5000/update/summonsNum=<summons num>&plateID=<plate id>&regState=<reg state>&issDate=<issue date>&vTime=<violaion time>&vCode=<violation code>&vehMake=<car make>&vehBody=<car body type>&vehYear=<car year>&street=<street>&county=<county>

Example:
http://localhost:5000/insert/summonsNum=5070559278&plateID=63540MC&regState=NY&issDate=1971-02-02T00:00:00.000&vTime=1116A&vCode=46&vehMake=FRUEH&vehBody=DELV&vehYear=2013&street=MARINE%20AVENUE&county=K

//last line for data1.json = "Summons Number": "5070559278"
