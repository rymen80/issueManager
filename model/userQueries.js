const findAllUsers = 'SELECT id, username FROM users;';
const findUserByIdQuery = 'SELECT id, username FROM users WHERE id = ?;';
const findUserByUsername = 'SELECT id, username, password FROM users WHERE username = ?;';
const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?);';
const deleteUserByIdQuery = 'DELETE FROM users WHERE ID = ?;';

module.exports = {
  findAllUsers,
  findUserByIdQuery,
  findUserByUsername,
  insertUserQuery,
  deleteUserByIdQuery,
};
