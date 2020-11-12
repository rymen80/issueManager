const {
  fetchAllLabel,
  fetchLabelId,
  fetchLabelName,
} = require('../model/labelOrm');

const getAllLabel = async (req, res) => {
  // console.log(req.body);
  try {
    const allLabel = await fetchAllLabel();
    // console.log('from the controller', allLabel);
    res.json(allLabel);
  } catch (e) {
    throw new Error(e)
  }
};

const getLabelId = async (req, res) => {
  try {
    const labelId = await fetchLabelId();
    console.log('from controller', labelId);
  } catch (e) {
    throw new Error(e)
  }
};

const getLabelName = async (req, res) => {
  try {
    const labelName = await fetchLabelName();
    console.log('from controller', labelName);
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  getAllLabel,
  getLabelId,
  getLabelName,
}