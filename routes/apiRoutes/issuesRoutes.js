const { getAllIssuesAPI } = require('../../controllers/issuesContoller');
const authMiddleWare = require('../../middlewares/authorizationMiddleware');
const router = require('express')
  .Router();

router.use(authMiddleWare);


/**
 * @swagger
 * /api/issues:
 *  get:
 *    description: Gets All Issues
 *    summary: Get All Issues 
 *    tags:
 *      - Issues
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type:string
 *        required:       
 *    responses:
 *      200:
 *        description: Status Ok        
 */
router.get('/',getAllIssuesAPI);

module.exports = router;

