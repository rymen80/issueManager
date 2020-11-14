const {
  fetchAllLabel,
  fetchLabelId,
} = require('../model/labelOrm');

const getAllLabel = async (req, res) => {
  // console.log(req.body);
  const labelid = req.params;
  if (labelid) {
    return getLabelId(labelid);
  }
  try {
    const allLabel = await fetchAllLabel();
    // console.log('from the controller', allLabel);
    res.json(allLabel);
  } catch (e) {
    throw new Error(e)
  }
};

const getLabelId = async (req, res) => {
  const labelid = req.params;
  try {
    const labelId = await fetchLabelId(labelid);
    console.log('from controller', labelId);
    res.json(labelId);
  } catch (e) {
    throw new Error(e)
  }
};

module.exports = {
  getAllLabel,
  getLabelId,
}