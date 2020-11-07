const getAllIssuesQuery = "SELECT * FROM issue_view;";
const getAllIssuesInProjectByIdQuery =
  "SELECT * FROM issue_view WHERE project_id = ? ;";
const getIssueByIdQuery = "SELECT * FROM issue_view WHERE id = ?;";
const getIssueByIssueKeyQuery = "SELECT * FROM issue_view WHERE issue_key = ?;";

const createIssueQuery = `
INSERT INTO issue (summary,description,reported_by,assigned_to,status,priority,project_id,resolution_id,label)
VALUES (?,?,?,?,?,?,?,?,?);`;

const deleteIssueByIdQuery = "DELETE FROM issue WHERE ID = ?;";

module.exports = {
  //SELECTS
  getAllIssuesQuery,
  getIssueByIdQuery,
  getIssueByIssueKeyQuery,
  getAllIssuesInProjectByIdQuery,

  //INSERT
  createIssueQuery,

  //DELETE
  deleteIssueByIdQuery,
};
