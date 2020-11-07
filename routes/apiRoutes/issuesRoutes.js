const {
  getAllIssuesAPI,
  insertIssueAPI,
} = require("../../controllers/issuesContoller");
const authMiddleWare = require("../../middlewares/authorizationMiddleware");
const router = require("express").Router();

router.use(authMiddleWare);

/**
 * @swagger
 * /api/issues:
 *  get:
 *    description: Gets All Issues. **REQUIRES ADMIN PREVILEGE**
 *    summary: Get All Issues. **REQUIRES ADMIN PREVILEGE**
 *    tags:
 *      - Issues
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type:string
 *        required: true
 *    responses:
 *      200:
 *        description: Status Ok
 *
 *  post:
 *    description: Create a new *ISSUE*
 *    summary: Create a new ISSUE
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    tags:
 *      - Issues
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type:string
 *        required: true
 *      - name: summary
 *        in: formData
 *        type: string
 *        required: true
 *        description: issue summary
 *      - name: description
 *        in: formData
 *        type: string
 *        required: true
 *        description: description of issue
 *      - name: assigned_to
 *        in: formData
 *        type: integer
 *        required: true
 *        description: Assigned to user id
 *      - name: status
 *        in: formData
 *        type: integer
 *        required: true
 *        description: status id of the issue
 *      - name: priority
 *        in: formData
 *        type: string
 *        required: true
 *        description: priority of the issue P0,P1,P2,P3,P4
 *      - name: project_id
 *        in: formData
 *        type: integer
 *        required: true
 *        description: project id
 *      - name: resolution_id
 *        in: formData
 *        type: integer
 *        required: true
 *        description: resolution id of the issue
 *      - name: label
 *        in: formData
 *        type: integer
 *        required: true
 *        description: label id for the issue
 *    responses:
 *      200:
 *        description: Status Ok
 *
 * /api/issues?projectid={projectid}:
 *  get:
 *    description: Gets All **Issues** In a **Project** By Id
 *    summary: Get All Issues In a Project By Id
 *    tags:
 *      - Issues
 *    parameters:
 *      - in: query
 *        name: projectid
 *        schema:
 *          type:integer
 *      - in: header
 *        name: authorization
 *        schema:
 *          type:string
 *        required: true
 *    responses:
 *      200:
 *        description: Status Ok
 */
router
  .route("/")
  .get(getAllIssuesAPI)
  .post(insertIssueAPI)
  .patch(() => {});

module.exports = router;
