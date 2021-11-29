# NY Parking Violations - Data

>Contributors: Ethan Bayer, Jason Lin, Justin Pham, Diane Shan, and Heng Tan

## Getting Started

Install [Node.JS](https://nodejs.org/en/).

Install [NY Parking Violations Dataset](https://www.kaggle.com/new-york-city/ny-parking-violations-issued?select=parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv)

### Setting Up Your Local Environment

1. Open up your terminal and clone the repository using `git clone https://github.com/ucr-cs180-fall21/cs180project-021-jdjhe.git`
2. `cd cs180project-021-jdjhe.git` to go into the project directory
3. `cd frontend` to go into the frontend folder
4. Run `npm install` to install all necessary packages
5. Open up a new terminal and make sure you are in the project directory
6. `cd backend` to go into the backend folder
7. Run `npm install` to install all necessary packages
8. Stay in the backend folder and type `mkdir datasets`
9. `ls` and you should see a new folder called `datasets`
10. Copy the 3 .csv files downloaded earlier from the dataset into the `datasets` folder
    - `parking-violations-issued-fiscal-year-2014-august-2013-june-2014.csv`
    - `parking-violations-issued-fiscal-year-2016.csv`
    - `parking-violations-issued-fiscal-year-2018.csv`
11. Now you're all set to start running the project!
12. To start the project running, run `npm run start` in both of your terminals
13. The project should automatically open up in your browser but if it does not, type `http://localhost:3000` into the address bar. If everything has been done correctly, you should now be able to view the project.

### Languages
- Typescript
- JavaScript
- Python
- CSS

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
    - Backend: all code for backend found here
        - datasets: contains the three csv files downloaded from the dataset
        - functions: contains functions used for parsing and searching
        - routes: contains routes for insert, update, delete, and for each analytic
        - node_modules: cache for external modules project depends on in backend
    - Frontend: all code for frontend found here
        - node_modules: cache for external modules project depends on in frontend
        - public: contains index.html (deafult website home page) and logo pictures for site icon
        - src: contains main css file, frontend routing, and all the components and resources for project
            - components: contains all the different components used in the project (data table, charts, graphs, toolbar)
                - All exported out to be used in the pages
            - imgs: contains all the images used in the project
            - pages: contains source code for each different page in the project

- 6 sprint folders documenting each sprint
    - Artifact
    - Demo

### Test Automation / Continuous Integration
We implemented automated testing and continuous integration using the [Jest](https://jestjs.io/) framework.
The tests can be found [insert test folder location here]