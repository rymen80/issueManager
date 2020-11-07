const router = require('express').Router();
const issuesRoutes = require('./issuesRoutes');
const projectRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');

// ** /issues route
router.use('/issues',issuesRoutes);

// ** /project route
router.use('/projects',projectRoutes);

// ** /User route
router.use('/users',userRoutes);

module.exports = router;
