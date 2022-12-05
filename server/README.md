
# sportradar-advanced-challenge

A brief description of what this project does and who it's for


An advanced node-js and my sql project this app continualy watches for game status an update the data-base when the data-base updates the express server return the updated data to the client 
this app use node-crone library to call the functon thats makes the api call every second that way the database is in sync with the current status and gives the client live feed to the game status  


## Environment Variables

To run this project, you will need to add the following environment variables to your file

`node 14.21.1`

`npm version 6.14.17
`




## Installation

Install my-project with npm

```bash 
git clone https://github.com/mhaley-jsfun/sportradar-api-challenge.git

cd sportradar-api-challenge

cd server

npm install or yarn
```
    
## Running Tests

To run tests, run the following command

```bash
  npm run test or yarn test
```


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express , node-crone

**test:**  Jest and super-test
