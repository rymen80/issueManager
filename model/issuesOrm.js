const {
  getAllIssuesQuery,
  getIssueByIdQuery,
  getIssueByIssueKeyQuery,
  createIssueQuery,
  deleteIssueByIdQuery,
} = require("./issuesQueries");
const connection = require("../config/connection");

// Fetch All Issues
const fetchAllIssues = async () => {
  try {
    const [rows] = await connection.query(getAllIssuesQuery);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Fetch Issue by Id
const fetchIssueById = async (id) => {
  try {
    const [rows] = await connection.query(getIssueByIdQuery, id);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Fetch Issue by Key
const fetchIssueByIssueKey = async (issueKey) => {
  try {
    const [rows] = await connection.query(getIssueByIssueKeyQuery, issueKey);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Delete Issue By Id
const deleteIssueById = async (id) => {
  try {
    const [rows] = await connection.query(deleteIssueByIdQuery, id);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Insert
const insertIssueToDb = async (
  issue_key,
  summary,
  description,
  reported_by,
  assigned_to,
  status,
  priority,
  modified_on,
  modified_by,
  project_id,
  resolution_id,
  label
) => {
  try {
    const [rows] = await connection.query(
      createIssueQuery,
      issue_key,
      summary,
      description,
      reported_by,
      assigned_to,
      status,
      priority,
      modified_on,
      modified_by,
      project_id,
      resolution_id,
      label
    );
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllIssues,
  fetchIssueById,
  fetchIssueByIssueKey,
  deleteIssueById,
  insertIssueToDb, 
};
