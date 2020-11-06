const { getAllProjectsAPI,  
  getProjectByIdAPI,
  getProjectByKeyAPI,
  insertProjectAPI,
  updateProjectAPI,
  deleteProjectByIdApi,
 } = require('../../controllers/projectController');

// const authMiddleWare = require('../../middlewares/authorizationMiddleware');
const router = require('express')
  .Router();

// *** /api/projects
router.route('/')
.get(getAllProjectsAPI)
.post(insertProjectAPI)
.patch(updateProjectAPI);


// *** e.g /api/project/1 where 1 is project_id
router.route('/:projectId')
.get(getProjectByIdAPI)
.delete(deleteProjectByIdApi);

// *** e.g /api/project/TPR where TPR is project_key
/**
 * @swagger
 * /api/projects/key/{projkey}:
 *  get:
 *    description: Get a Project by Project_key
 *    summary: Get a Project by Project_key 
 *    tags:
 *      - Projects
 *    parameters:
 *      - in: path
 *        name: projkey
 *        #required:true     
 *        schema:
 *          type:string
 *    responses:
 *      200:
 *        description: Status Ok        
 */
router.get('/key/:projectKey',getProjectByKeyAPI);


module.exports=router;