# shuffle-recipe-backend
### This project was created by using Node.js, Express, Mongo.

## Available Scripts

In the project directory, you can run:

### `npm install`
Install all the packages needed for the app to work.

### `npm run dev`

Runs the app in the development mode.\
Request goes to [http://localhost:8001](http://localhost:8001) or the port assign by yourself in you .env


### `npm run test`

Launches the test runner

### `npm run coverage`

Lauches and show actual test coverage of the project


About the project

- Configure your .env file as needed, base example in .env.example use a local mongo instance for the project pointing to mongodb://localhost:27017/shuffleRecipe
- Take in consideration server is listening to port 8001, client expect request to that port. 
CORS is configure to not be a problem in a dev env in App.ts, anyway if you env request you to change cors configuration, please check [https://www.npmjs.com/package/cors]
