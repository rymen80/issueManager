require("dotenv").config();
const mysql = require('mysql2');
connection = mysql.createConnection(process.env.JAWSDB_URL).promise();

const {
  findAllLabelQuery,
  findLabelIdQuery,
  findLabelNameQuery,
} = require('./labelQueries')

const fetchAllLabel = async () => {
  try {
    const [allLabel] = await connection.query(findAllLabelQuery);
    console.log('These are all labels', allLabel);
    return allLabel;
  } catch (e) {
    throw new Error(e)
  }
};

const fetchLabelId = async () => {
  try {
    const [labelId] = await connection.query(findLabelIdQuery);
    console.log(labelId);
    return labelId;
  } catch (e) {
    throw new Error(e)
  }
};

const fetchLabelName = async () => {
  try {
    const [labelName] = await connection.query(findLabelNameQuery);
    console.log(labelName);
    return labelName;
  } catch (e) {
    throw new Error(e)
  }
};

module.exports = {
  fetchAllLabel,
  fetchLabelId,
  fetchLabelName,
}