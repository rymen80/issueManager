const {
    getAllResolutionsAPI,
    getResolutionsByResolutionIdAPI,
} = require('../../controllers/resolutionCotroller');

const authMiddleware = require('../../middlewares/authorizationMiddleware');

const router = require("express").Router();

router.use(authMiddleware);




router.route("/").get(getAllResolutionsAPI);

router.route("/:resolutionId").get(getResolutionsByResolutionIdAPI);

module.exports = router;
