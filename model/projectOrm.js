const {
  fetchAllProjectsQuery,
  fetchAllProjectsForUserQuery,
  fetchProjectByIdQuery,
  fetchProjectByProjectKeyQuery,
  updateProjectQuery,
  insertProjectQuery,
  deleteProjectByIdQuery
} = require('./projectQueries');

const connection = require('../config/connection');

// *** Get All Projects
const fetchAllProjectsFromDb = async () => {
  try {
    const [rows] = await connection.query(fetchAllProjectsQuery);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
}; 

// *** Get All Projects for a specific user
const fetchAllProjectsForUserFromDb  = async (userId) => {
  try {
    const [rows] = await connection.query(fetchAllProjectsForUserQuery,userId);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

// *** Get Project By Id
const fetchProjectByIdFromDb  = async (projectId) => {
  try {
    const [rows] = await connection.query(fetchProjectByIdQuery,projectId);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

// *** Get Project by Key
const fetchProjectByProjectKeyFromDb  = async (projectKey) => {
  try {
    const [rows] = await connection.query(fetchProjectByProjectKeyQuery,projectKey);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

// *** Update PojectName and Project Description
const updateProjectInDb  = async (projName,proDesc,projectId) => {
  try {
    const [rows] = await connection.query(updateProjectQuery,[projName,proDesc,projectId]);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// *** Insert Project
const insertProjectInDb  = async (project_name, project_key,project_description,created_by) =>{
  console.log(project_name);
  try {
    const [rows] = await connection.query(insertProjectQuery,[project_name, project_key,project_description,created_by]);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// *** Delete Project
const deleteProjectByIdFromDb  = async (projectId) => {
  try {
    const [rows] = await connection.query(deleteProjectByIdQuery,projectId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllProjectsFromDb,
  fetchAllProjectsForUserFromDb,
  fetchProjectByIdFromDb,
  fetchProjectByProjectKeyFromDb,
  updateProjectInDb,
  insertProjectInDb,
  deleteProjectByIdFromDb
} 