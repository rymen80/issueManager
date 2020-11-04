const findAllUsers = 'SELECT id, username FROM user;';
const findUserByIdQuery = 'SELECT id, username FROM user WHERE id = ?;';
const findUserByUsername = 'SELECT id, username, password FROM user WHERE username = ?;';
const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?);';
const deleteUserByIdQuery = 'DELETE FROM user WHERE ID = ?;';

module.exports = {
  findAllUsers,
  findUserByIdQuery,
  findUserByUsername,
  insertUserQuery,
  deleteUserByIdQuery,
};
