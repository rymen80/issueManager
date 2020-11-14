const {
  findAllCommentQuery,
  findAllCommentIdQuery,
  findAllCommentUserIdQuery,
} = require('./commentQueries');
const connection = require("../config/connection");


const fetchAllComments = async () => {
  try {
    const [comments] = await connection.query(findAllCommentQuery)
    console.log(comments[0])
    return comments
  } catch (e) {
    throw new Error(e)
  }
};

const fetchCommentId = async (id) => {
  try {
    const [commentId] = await connection.query(findAllCommentIdQuery, id)
    // console.log(commentId);
    return commentId
  } catch (e) {
    throw new Error(e)
  }
};

const fetchCommentUser = async (id) => {
  try {
    const [commentUser] = await connection.query(findAllCommentUserIdQuery, id);
    // console.log(commentUser);
    return commentUser;
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  fetchAllComments,
  fetchCommentId,
  fetchCommentUser,
}