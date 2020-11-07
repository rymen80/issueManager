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
/**
 * @swagger
 * /api/projects:
 *  get:
 *    description: Get a list of projects to which user belongs
 *    summary: Get a list of projects to which user belongs
 *    tags:
 *      - Projects
 *    parameters:
 *      - name: userid
 *        in: query
 *        type: integer
 *        required: true
 *        description: Numeric user id 
 *    responses:
 *      200:
 *        description: Status Ok  
 *  post:
 *    description: Create a new *project*
 *    summary: Create a new project
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    tags:
 *      - Projects
 *    parameters:      
 *      - name: name
 *        in: formData
 *        type: string        
 *        required: true
 *        description: project Name String
 *      - name: key
 *        in: formData
 *        type: string
 *        required: true
 *        description: A short 3 letter key to identify project
 *      - name: description
 *        in: formData
 *        type: string
 *        required: true
 *        description: Description of project
 *      - name: created_by
 *        in: formData
 *        type: integer
 *        required: true
 *        description: UserId of user creating this project
 *    responses:
 *      200:
 *        description: Status Ok  
 */       
router.route('/')
.get(getAllProjectsAPI)
.post(insertProjectAPI)
.patch(updateProjectAPI);


// *** e.g /api/project/1 where 1 is project_id
/**
 * @swagger
 * /api/projects/{id}:
 *  get:
 *    description: Get a Project by Project Id
 *    summary: Get a Project by Project Id
 *    tags:
 *      - Projects
 *    parameters:
 *      - in: path
 *        name: id
 *        #required:true     
 *        schema:
 *          type:integer
 *    responses:
 *      200:
 *        description: Status Ok        
 */
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