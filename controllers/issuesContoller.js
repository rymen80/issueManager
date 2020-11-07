const {
  fetchAllIssues,
  fetchIssueById,
  fetchIssueByIssueKey,
  deleteIssueById,
  insertIssueToDb,
  fetchAllIssuesByProjectId,
} = require("../model/issuesOrm");

async function getAllIssuesAPI(req, res) {
  console.log(parseInt(req.query.projectid));
  try {
    let issues;
    if (isNaN(parseInt(req.query.projectid))) {
      if (!req.user.isadmin) {
        return res.status(403).json("admin previlege is required");
      }
      issues = await fetchAllIssues();
      res.json(issues);
    } else {
      issues = await fetchAllIssuesByProjectId(req.query.projectid);
      res.json(issues);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function insertIssueAPI(req, res) {
  const {
    summary,
    description,
    assigned_to,
    status,
    priority,
    project_id,
    resolution_id,
    label,
  } = req.body;
  try {
    const issue = await insertIssueToDb(
      summary,
      description,
      parseInt(req.user.id),
      assigned_to,
      status,
      priority,
      project_id,
      resolution_id,
      label
    );
    res.json(issue);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  getAllIssuesAPI,
  insertIssueAPI,
};
