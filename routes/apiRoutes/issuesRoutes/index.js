const { getAllIssuesAPI } = require('../../../controllers/issuesContoller');
const authMiddleWare = require('../../../middlewares/authorizationMiddleware');
const router = require('express')
  .Router();

// const {
//   signInApi,
//   signUpApi,
// } = require('../../controllers/authController');

// /auth prepended to everything
// const signInMiddleware = require('../../middlewares/signInMiddleware');
// /auth/signin
router.use(authMiddleWare);
router.get('/',getAllIssuesAPI);


// router.post('/signin', signInMiddleware, signInApi);
// router.post('/signup', signUpApi);

module.exports = router;

