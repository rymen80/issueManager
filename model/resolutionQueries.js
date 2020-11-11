const getAllResolutionsQuery = " Select * FROM resolution;";
const getResolutionByResolutionIdQuery = " SELECT * FROM resolution WHERE resolution_id = ?;";


module.exports = {
    getAllResolutionsQuery,
    getResolutionByResolutionIdQuery,
}
