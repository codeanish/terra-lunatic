# terra-lunatic

Sample deployment https://main.d2adwe4wbtllyo.amplifyapp.com/

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

## Version history

This is change from the previous version of this project. This version moves away from the server dependency and has all queries pushed to the client and away from flipside crypto. This has reduced the complexity of the solution and improves on the maintainability of the solution.

## The downside of using Flipside Crypto APIs

Flipside crypto is great for making API queries, however it presents a few problems.

1. You can't pass in parameters to a query
2. There is a limit to how many results a given query can return (requiring multiple APIs for pagination)
3. Flipside crypto updates can be between 4-24 hours behind the blockchain based on my testing

These issues can lead to not showing the user the correct responses to various actions e.g. Luna Staked. There have been > 100k staking transactions and Flipside Crypto cannot return them all in one query, so any transactions after that point need to be in a separate query - this increases the maintenance load on the maintainer of this site.
