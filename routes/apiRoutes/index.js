const router = require('express').Router();
const issuesRoutes = require('./issuesRoutes');

// ** /issues route
router.use('/issues',issuesRoutes);

module.exports = router;
