const insertFweetQuery = 'INSERT INTO fweets (fweet, userId) VALUES (?, ?);';
const findAllFweetsQuery = 'SELECT * FROM fweets;';
const findFweetByIdQuery = 'SELECT * FROM fweets WHERE id = ?;';
const findFweetsByUserQuery = 'SELECT * FROM fweets WHERE userId = ?;';
const deleteFweetByIdQuery = 'DELETE FROM fweets WHERE id = ?;';


module.exports = {
  insertFweetQuery,
  findAllFweetsQuery,
  findFweetByIdQuery,
  findFweetsByUserQuery,
  deleteFweetByIdQuery,
}
