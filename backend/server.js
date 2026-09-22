// Foundational module imports for our server's functionality and for express to work
const express = require("express");
// CORS is needed to enable our frontend to make requests to our backend by setting response headers and relaxing the browser security restriction between front and backend which run on different origins/ports
const cors = require("cors");
// Path is a utility module included in node.js needed to enable cross-platform path handling, and makes it easier for us to manipulate our paths
const path = require("path");
// Importing and configuring dotenv loads environment-specific config variables from .env.testing into process.env to keep our passwords, credentials, and API keys secret and secure
// .env.testing points us to a test-specific configuration instead of default .env
// since it's the only .env file referenced, it's the main config file in use
require("dotenv").config({
  path: path.join(__dirname, ".env.testing"),
});

// Creates an instance of the express application
const app = express();
// Defines the port - if a port is defined in the environment variable, by us or a hosting platform, use that port, otherwise use 3000
const PORT = process.env.PORT || 3000;
// The url of our external Superhero API we're going to consume
// Stored as a constant variable here for better maintainability - if our api url changes we only have to update it here
const baseURL = `https://akabab.github.io/superhero-api/api`;

// Important to put this before our route handlers to enable cross-origin resource sharing on every incoming request that passes through this middleware first
// Express reads the file in order so cors needs to be registered first to apply to all our endpoints
app.use(cors());

// GET - root route
// Verifies our backend is running and on what port
// Sends our message/response to the client
app.get("/", (req, res) => {
  res.send(`Heroes Backend running on ${PORT}`);
});

// GET - /heroes
// Returns a list of our heroes found by query parameters of ids
app.get("/heroes", async (req, res) => {
  // If "ids" query parameter doesn't exist,
  // respond with a 400 status code and error message instead of attempting to fetch anything
  if (!req.query.ids) {
    res.status(400).send("valid ids are required\n");
    return;
  }
  // Turns the query string into an array of ids,
  // split wherever a comma is found.
  // Makes it easier to loop over them later
  let idsArr = req.query.ids.split(",");

  // heroes data will be saved here in this currently empty array
  let heroes = [];

  // async promise for fetching a hero by its id
  // response is attempting to fetch one hero at a time from the api and parsed to json
  // wrapping this fetchHero function in async promise and using a try/catch for each id allows us to get some heroes with ids back
  // but doesn't throw an error for all fetch responses if one hero has a missing id
  async function fetchHero(id) {
    try {
      let response = await fetch(`${baseURL}/id/${id}.json`);
      if (!response.ok) {
        console.log(`error getting hero ${id}\n`, response.statusText);
        return;
      }

      // if the response is successful, the hero found by id is pushed to the heroes array
      let hero = await response.json();
      heroes.push(hero);

      // we're isolating the errors and skipping the heroes we can't fetch,
      // instead of fully stopping the process
    } catch (err) {
      // Sending a 400 status will cause the entire request
      // to fail.  So we are just reporting it on console
      // and moving onto the next id
      console.log("error getting hero\n", err);
    }
  }

  // as we loop through individual fetches, it waits for one hero id to finish fetching before moving on
  // this is a slower process, but helps us debug easier and also is rate limiting which is nicer on the API
  // - eg preventing us from getting throttled or blocked for too many simultaneous requests
  for (let id of idsArr) {
    await fetchHero(id);
  }
  // Once the loop has finished going through each id,
  // it sends the heroes array back to the client as a json response with the successfully found heroes
  res.json(heroes);
});

// This tells us the server has successfully started and
// ready to listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Heroes backend listening on port ${PORT}\n`);
});
