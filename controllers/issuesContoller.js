const {
  fetchAllIssues,
  fetchIssueById,
  fetchIssueByIssueKey,
  deleteIssueById,
  insertIssueToDb,
  fetchAllIssuesByProjectId,  
} = require("../model/issuesOrm");

const {fetchAllStatus} = require("../model/statusOrm");
const {fetchAllResolutions} = require("../model/resolutionOrm");
const {fetchAllLabel} = require("../model/labelOrm")

const connection = require("../config/connection"); // Special case.


async function AssembleIssuesData(issues){
//await connection.query(findAllLabelQuery);
  const allLabel = await fetchAllLabel();
  const [users] = await connection.query("SELECT id,username from user");
  const [projects] = await connection.query("SELECT project_id,project_name from project");
  const allStatus = await fetchAllStatus();
  const resolutions = await fetchAllResolutions();
  issues.forEach(issue =>{
    issue.label={id:issue.id,value:allLabel.filter(l=>l.label_id===issue.label).map(x=>x.label_name)[0]};
    issue.reported_by={id:issue.reported_by,value:users.filter(u=>u.id===issue.reported_by).map(x=>x.username)[0]};
    issue.assigned_to={id:issue.assigned_to,value:users.filter(u=>u.id===issue.assigned_to).map(x=>x.username)[0]};
    issue.project={id:issue.project_id,value:projects.filter(p=>p.project_id===issue.project_id).map(x=>x.project_name)[0]};
    issue.resolution={id:issue.resolution_id,value:resolutions.filter(r=>r.resolution_id===issue.resolution_id).map(x=>x.resolution_name)[0]};
    issue.status={id:issue.status,value:allStatus.filter(s=>s.status_id===issue.status).map(x=>x.status_name)[0]};
  });
  return issues;

}

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
      // Assembling the new JSON FORMAT
      const assembledIssues = await AssembleIssuesData(issues);
      res.json(assembledIssues);
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
