const {
  fetchAllProjectsFromDb,
  fetchAllProjectsForUserFromDb,
  fetchProjectByIdFromDb,
  fetchProjectByProjectKeyFromDb,
  updateProjectInDb,
  insertProjectInDb,
  deleteProjectByIdFromDb,
} = require("../model/projectOrm");

async function getAllProjectsAPI(req, res) {
  let project;
  if(req.query.userid){
    const projects = await fetchAllProjectsForUserFromDb(req.query.userid);
    return res.json(projects);
  }
  try {
    const projects = await fetchAllProjectsFromDb();
    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function getProjectByIdAPI(req, res) {
  const { projectId } = req.params;
  try {
    const projects = await fetchProjectByIdFromDb(projectId);
    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function getProjectByKeyAPI(req, res) {
  const { projectKey } = req.params;
  try {
    const projects = await fetchProjectByProjectKeyFromDb(projectKey);
    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function insertProjectAPI(req, res) {
  const { name, key,description,created_by } = req.body;
  try {
    const projects = await insertProjectInDb(name, key,description,created_by);
    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function updateProjectAPI(req, res) {
  const { name, description,projectId } = req.body;
  try {
    const projects = await updateProjectInDb(name, description,projectId);
    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

const deleteProjectByIdApi= async (req, res) => {
  const { projectId } = req.params;
  try {
    const projects = await deleteProjectByIdFromDb(projectId);
    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}



module.exports={
  getAllProjectsAPI,
  getProjectByIdAPI,
  getProjectByKeyAPI,
  insertProjectAPI,
  updateProjectAPI,
  deleteProjectByIdApi,
};
