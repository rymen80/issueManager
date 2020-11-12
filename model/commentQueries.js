const findAllCommentQuery = 'SELECT * FROM comment;';
const findAllCommentIdQuery = 'SELECT comment_id FROM comment;';
const findAllCommentTextQuery = 'SELECT comment_text FROM comment;';
const findAllCommentIssueIdQuery = 'SELECT issue_id FROM comment;';
const findAllCommentUserIdQuery = 'SELECT user_id FROM comment;';
const findAllCommentDateTimeQuery = 'SELECT created_date_time FROM comment;';

module.exports = {
  findAllCommentQuery,
  findAllCommentIdQuery,
  findAllCommentTextQuery,
  findAllCommentIssueIdQuery,
  findAllCommentUserIdQuery,
  findAllCommentDateTimeQuery,
}