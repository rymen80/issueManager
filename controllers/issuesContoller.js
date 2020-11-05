const {
  fetchAllIssues,
  fetchIssueById,
  fetchIssueByIssueKey,
  deleteIssueById,
  insertIssueToDb, 
} = require('../model/issuesOrm');

async function getAllIssuesAPI(req, res) {
  try{
  const issues = await fetchAllIssues();
    res.json(issues);
  }
  catch (e) {
    console.log(e);
    res.status(400)
      .json(e);
  }
  }

  module.exports={
    getAllIssuesAPI,
  };

