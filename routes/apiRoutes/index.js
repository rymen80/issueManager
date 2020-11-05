const router = require('express').Router();
const issuesRoutes = require('./issuesRoutes');


// Setup your routes for /api/something here
// This line of code makes it so that /api/fweets is prepended to fweetRoutes
// example route.use('/myRoute', myRoutes);
router.use('/issues',issuesRoutes);

module.exports = router;
