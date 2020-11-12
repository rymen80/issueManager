const {
    getAllResolutionsAPI,
    getAllResolutionsByResolutionIdAPI,
} = require('../../controllers/resolutionCotroller');

const authMiddleware = require('../../middlewares/authorizationMiddleware');

const router = require("express").Router();

router.use(authMiddleware);




router.route("/").get(getAllResolutionsAPI);

router.route("/:resolutionId").get(getAllResolutionsByResolutionIdAPI);

module.exports = router;
