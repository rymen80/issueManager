const router = require('express').Router();
const issuesRoutes = require('./issuesRoutes');
const projectRoutes = require('./projectRoutes');

// ** /issues route
router.use('/issues',issuesRoutes);

// ** /project route
router.use('/projects',projectRoutes);

module.exports = router;
