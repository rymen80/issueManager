const router = require('express')
  .Router();

const {
  signInApi,
  signUpApi,
} = require('../../controllers/authController');

// *** /auth middleware prepended to everything
const signInMiddleware = require('../../middlewares/signInMiddleware');

/**
 *  @swagger
 * 
 *  /auth/signin:
 *  post:
 *    description: signin to IssUse
 *    summary: user signin
 *    tags:
 *      - Auth
 *    requestbody:
 *      content:
 *        application/json:
 *        schema:
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *      
 */
router.post('/signin', signInMiddleware, signInApi);

router.post('/signup', signUpApi);

module.exports = router;
