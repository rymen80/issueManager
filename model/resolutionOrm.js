const {
    getAllResolutionsQuery,
    getResolutionByResolutionIdQuery,
} = require("./resolutionQueries");

const connection = require("../config/connection");


// Fetch all Resolutions
const fetchAllResolutions = async () => {
    try {
        const [rows] = await connection.query(getAllResolutionsQuery);
        return rows;
    } catch (e) {
        throw new Error(e);
    }
};


// Fetch all Resolutions by ResolutionID

const fetchAllResolutionsByResolutionID = async (resolutionID) => {
    try {
        const [rows] = await connection.query(getResolutionByResolutionIdQuery, resolutionID );
        return rows[0];
    } catch (e) {
        throw new Error(e);
    }

};

module.exports = {
    fetchAllResolutions,
    fetchAllResolutionsByResolutionID,
}



