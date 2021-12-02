# NY Parking Violations - Data

>Contributors: Ethan Bayer, Jason Lin, Justin Pham, Diane Shan, and Heng Tan

## Introduction
JDJHE - An application for searching, querying, and analyzing NY parking violation data.
![](overview.gif)

## Installation

### Prerequisites
- [Node.JS](https://nodejs.org/en/)
- [Python 3.6+](https://python.org)
- Application code
    - `git clone https://github.com/ucr-cs180-fall21/cs180project-021-jdjhe.git`
    - The following instructions will assume being in the code directory (i.e., via `cd cs180project-021-jdjhe`)
- [NY Parking Violations Dataset](https://www.kaggle.com/new-york-city/ny-parking-violations-issued?select=parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv)


### Starting the backend
1. Open a new terminal and go into the backend directory.
    - `cd backend`
2. Make the following directories: `datasets` (for the raw data), and `parsed_data` (for intermediate data that is easier to analyze)
    - `mkdir datasets && mkdir parsed_data`
2. Go into the `datasets` directory and move the downloaded dataset (`archive.zip`) into this directory.
    - `cd datasets`
    - `mv ~/Downloads/archive.zip .` (Could be different based on where the dataset was downloaded)
3. Unzip the dataset. You should have `parking-violations-issued-fiscal-year-XXX.csv` in the current directory.
    - `unzip archive.zip`
4. Run the data preparser. This will put JSON files in the `parsed_data` directory we created earlier.
    - `python3 ../functions/main.py`
5. Go back to the base backend directory.
    - `cd ..` (from the `datasets` directory)
6. Install the necessary packages needed to run the backend.
    - `npm install`
7. Start the backend.
    - `npm run`

### Starting the fontend
1. Open a new terminal and go into the frontend directory from the project base.
    - `cd frontend`
2. Install the necessary packages needed to run the frontend.
    - `npm install`
3. Start the frontend. If your browser doesn't automatically open, you can access the frontend at `http://localhost:3000`.
    - `npm run`

### Languages
- HTML/CSS
- Javascript (with some Typescript)
- Python

### Backend Technologies
- Node.JS
- Express.JS
- Python

### Frontend Technologies
- React
- React Bootstrap
- React Router
- CanvasJS

### Dataset
- [NY Parking Violations](https://www.kaggle.com/new-york-city/ny-parking-violations-issued?select=parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv)

### Guide to Source Code
- Two main folders:
    - `backend`: all code for backend found here
        - `datasets`: contains the three csv files downloaded from the dataset
        - `parsed_data`: contains JSON files that are used for analysis.
        - `functions`: contains functions used for parsing and searching
        - `routes`: contains backend server logic, such as routes for insert, update, delete, and analytics
        - `node_modules`: dependencies needed to run the backend
    - `frontend`: all code for frontend found here
        - `public`: contains static files, such as index.html, icons, and pictures
        - `src`: contains all the react code for the application
            - `components`: contains all the different components used in the project (data table, charts, graphs, toolbar)
                - All exported out to be used in the pages
            - `imgs`: contains all the images used by the React components
            - `pages`: contains source code for each different page in the project
        - `node_modules`: dependencies needed to run the frontend

- 6 sprint folders documenting each sprint
    - Artifact
    - Demo

### Test Automation / Continuous Integration
We implemented automated testing and continuous integration using the [Jest](https://jestjs.io/) framework.
The tests can be found [here](backend/backend.test.js). Our tests run on every push/pull request to master/develop.
- [Example of a successful PR](https://github.com/ucr-cs180-fall21/cs180project-021-jdjhe/pull/77)
- [Example of a failing PR](https://github.com/ucr-cs180-fall21/cs180project-021-jdjhe/pull/78)