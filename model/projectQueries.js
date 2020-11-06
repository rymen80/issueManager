const fetchAllProjectsQuery = 'SELECT * from project;';
const fetchAllProjectsForUserQuery = `SELECT p.project_id,p.project_name,p.project_key,p.project_description,p.created_by,p.created_date,pu.user_id FROM project p
inner join projectusers pu
on p.project_id= pu.project_id
WHERE pu.user_id = ?;`;

const fetchProjectByIdQuery = 'SELECT * from project WHERE project_id = ?;';
const fetchProjectByProjectKeyQuery = 'SELECT * from project WHERE project_key = ?;';

// *** Only project Name and Description can be updated and nothing else
const updateProjectQuery = 'UPDATE project SET project_name = ?, project_description = ? WHERE project_id = ?;';

const insertProjectQuery = 'INSERT INTO project (project_name,project_key,project_description,created_by) VALUES (?,?,?,?);';
const deleteProjectByIdQuery = 'DELETE FROM project WHERE project_id = ?;';

module.exports = {
  fetchAllProjectsQuery,
  fetchAllProjectsForUserQuery,
  fetchProjectByIdQuery,
  fetchProjectByProjectKeyQuery,
  updateProjectQuery,
  insertProjectQuery,
  deleteProjectByIdQuery,
};
