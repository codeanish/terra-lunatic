# terra-lunatic

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

## Dependencies

This project requires a [terra-lunatic-server](https://github.com/codeanish/terra-lunatic-server) to be up and running to respond to API requests. The API was built on top of the flipside api's to provide a more dynamically queryable api (improved user experience).

Specify a .env file to load up and add in a REACT_APP_API_URL environment variable with a value of where the server is hosted. If it's hosted using docker-compose locally, it's probably http://localhost:5000. 