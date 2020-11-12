const {
  fetchAllComments,
  fetchCommentId,
  fetchCommentText,
  fetchCommentIssue,
  fetchCommentUser,
  fetchDateTime,
} = require("../model/commentOrm")

const getAllComments = async (req, res) => {
  try {
    const allComments = await fetchAllComments()
    // console.log('these are all Comments', allComments);
    res.json(allComments)
  } catch (e) {
    throw new Error(e)
  }
};

const getAllCommentId = async (req, res) => {
  try {
    const commentsIds = await fetchCommentId()
    // console.log(commentsIds);
    console.log(res.json(commentsIds));
  } catch (e) {
    throw new Error(e)
  }
};

const getAllCommentText = async (req, res) => {
  try {
    const commentText = await fetchCommentText();
    console.log(commentText);
    res.json(commentText)
  } catch (e) {
    throw new Error(e)
  }
};

const getCommentIssue = async (req, res) => {
  try {
    const commentIssue = await fetchCommentIssue();
    res.json(commentIssue)
  } catch (e) {
    throw new Error(e)
  }
};

const getCommentUser = async (req, res) => {
  try {
    const commentUser = await fetchCommentUser();
    res.json(commentUser)
  } catch (e) {
    throw new Error(e)
  }
};

const getDateTime = async (req, res) => {
  try {
    const dateAndTime = await fetchDateTime();
    res.json(dateAndTime)
  } catch (e) {
    throw new Error(e)
  }
};

module.exports = {
  getAllComments,
  getAllCommentId,
  getAllCommentText,
  getCommentIssue,
  getCommentUser,
  getDateTime,
}