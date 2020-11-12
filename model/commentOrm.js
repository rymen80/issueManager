require("dotenv").config();
const mysql = require('mysql2');
connection = mysql.createConnection(process.env.JAWSDB_URL).promise();


const {
  findAllCommentQuery,
  findAllCommentIdQuery,
  findAllCommentTextQuery,
  findAllCommentIssueIdQuery,
  findAllCommentUserIdQuery,
  findAllCommentDateTimeQuery,
} = require('./commentQueries');

const fetchAllComments = async () => {
  try {
    const [comments] = await connection.query(findAllCommentQuery)
    console.log(comments[0])
    return comments
  } catch (e) {
    throw new Error(e)
  }
};

const fetchCommentId = async () => {
  try {
    const [commentId] = await connection.query(findAllCommentIdQuery)
    // console.log(commentId);
    return commentId
  } catch (e) {
    throw new Error(e)
  }
};

const fetchCommentText = async () => {
  try {
    const [commentText] = await connection.query(findAllCommentTextQuery)
    // console.log(commentText);
    return commentText;
  } catch (e) {
    throw new Error(e)
  }
};

const fetchCommentIssue = async () => {
  try {
    const [commentIssue] = await connection.query(findAllCommentIssueIdQuery)
    // console.log(commentIssue);
    return commentIssue;
  } catch (e) {
    throw new Error(e)
  }
};

const fetchCommentUser = async () => {
  try {
    const [commentUser] = await connection.query(findAllCommentUserIdQuery);
    // console.log(commentUser);
    return commentUser;
  } catch (e) {
    throw new Error(e)
  }
}

const fetchDateTime = async () => {
  try {
    const [dateTime] = await connection.query(findAllCommentDateTimeQuery);
    // console.log(dateTime);
    return dateTime;
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  fetchAllComments,
  fetchCommentId,
  fetchCommentText,
  fetchCommentIssue,
  fetchCommentUser,
  fetchDateTime,
}