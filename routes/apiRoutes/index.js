const router = require('express').Router();
const issuesRoutes = require('./issuesRoutes');
const projectRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');
const resolutionRoutes = require('./resolutionRoutes');

// ** /issues route
router.use('/issues',issuesRoutes);

// ** /project route
router.use('/projects',projectRoutes);

// ** /User route
router.use('/users',userRoutes);

router.use('/resolutions', resolutionRoutes);

module.exports = router;
