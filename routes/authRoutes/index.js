const router = require('express')
  .Router();

const {
  signInApi,
  signUpApi,
} = require('../../controllers/authController');

// /auth prepended to everything
const signInMiddleware = require('../../middlewares/signInMiddleware');
// /auth/signin

router.post('/signin', signInMiddleware, signInApi);
router.post('/signup', signUpApi);

module.exports = router;
