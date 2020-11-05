const getAllIssuesQuery = 'SELECT * FROM issue;';
const getIssueByIdQuery = 'SELECT * FROM issue WHERE id = ?;';
const getIssueByIssueKeyQuery = 'SELECT * FROM issue WHERE issue_key = ?;';

const createIssueQuery = `
INSERT INTO issue (issue_key,summary,description,reported_by,assigned_to,status,priority,
modified_on,modified_by,project_id,resolution_id,label)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;

const deleteIssueByIdQuery = 'DELETE FROM issue WHERE ID = ?;';

module.exports = {
  //SELECTS
  getAllIssuesQuery,
  getIssueByIdQuery,
  getIssueByIssueKeyQuery,

  //INSERT
  createIssueQuery,

  //DELETE
  deleteIssueByIdQuery,
};
