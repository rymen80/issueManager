const {
    fetchAllResolutions,
    fetchAllResolutionsByResolutionID,
} = require('../model/resolutionOrm');


async function getAllResolutionsAPI(req,res) {

    console.log(req.query);
    try {
        let resolutions = await fetchAllResolutions();
        res.json(resolutions);

    } catch (e) {
        res.status(400).json(e);
    }
}



async function getResolutionsByResolutionIdAPI (req,res) {
    const { resolutionId } = req.params;
    console.log(req.query);
    try {
        let resolutionById = await fetchAllResolutionsByResolutionID(resolutionId);
        res.json(resolutionById);

    } catch (e) {
        res.status(400).json(e);
    }
}

module.exports = {
    getAllResolutionsAPI,
    getResolutionsByResolutionIdAPI,
}


