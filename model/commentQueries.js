const findAllCommentQuery = 'SELECT * FROM comment;';
const findAllCommentIdQuery = 'SELECT comment_id FROM comment where comment_id = ?;';
const findAllCommentUserIdQuery = 'SELECT user_id FROM comment where user_id = ?;';

module.exports = {
  findAllCommentQuery,
  findAllCommentIdQuery,
  findAllCommentUserIdQuery,
}