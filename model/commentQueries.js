const findAllCommentQuery = 'SELECT * FROM comment;';
const findAllCommentIdQuery = 'SELECT * FROM comment where comment_id = ?;';
const findAllCommentUserIdQuery = 'SELECT * FROM comment where user_id = ?;';

module.exports = {
  findAllCommentQuery,
  findAllCommentIdQuery,
  findAllCommentUserIdQuery,
}