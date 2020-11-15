const {
  findAllLabelQuery,
  findLabelIdQuery,
} = require('./labelQueries');
const connection = require("../config/connection");

const fetchAllLabel = async () => {
  try {
    const [allLabel] = await connection.query(findAllLabelQuery);
    console.log('These are all labels', allLabel);
    return allLabel;
  } catch (e) {
    throw new Error(e)
  }
};

const fetchLabelId = async (id) => {
  try {
    const labelId = await connection.query(findLabelIdQuery, id);
    console.log(labelId);
    return labelId;
  } catch (e) {
    throw new Error(e)
  }
};

module.exports = {
  fetchAllLabel,
  fetchLabelId,
}