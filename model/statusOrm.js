const connection = require("../config/connection");

const fetchAllStatus = async () => {
  try {
    const [allStatus] = await connection.query("SELECT * FROM status;");
       return allStatus;
  } catch (e) {
    throw new Error(e)
  }
};


module.exports = { fetchAllStatus};