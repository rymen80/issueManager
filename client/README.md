// UPDATE CALLS ARE OPTIONAL

// Create the queries for fweets

// Create an ORM for Fweets
// CREATE
// For creating a fweet it should take a fweet and a userId as a parameter
// this function should return the newly created fweet as well as the ID of the person who made it


// For getting all Fweets
// Make sure that this returns all of the Fweets from the database as well as the id of the user
// who created the Fweet

// For getting a fweet
// Make sure this returns a fweet by it's ID as well as the ID of the user who created the fweet



// For deleting a fweet
// Deletes a fweet by it's id
// Make this  returns the fweet that was just deleted


// Create routes for creating/deleting/getting fweets
// The routes should be using our authMiddleware
//to ensure that there's a logged in user
// This will be how you will be getting the ID of the user who is trying to create a fweet
// the routes and request should be as follows

// POST /api/fweets
// GET  /api/fweets

// GET  /api/fweets/:fweetId
// Delete /api/fweets/:fweetId

// Create a Controller for Fweets
// These should call the ORM you've created
//
// Make sure to test all of your routes with postman.
// Dont forget to sign in, and include your token as a header labeled 'authorization'
// on every request!
