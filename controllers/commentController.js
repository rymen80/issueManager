const {
  fetchAllComments,
  fetchCommentId,
  fetchCommentUser,
} = require("../model/commentOrm")

const getAllComments = async (_req, res) => {
  const commentid = req.params;
  const commentUserId = req.params;
  if (commentid) {
    return getCommentId(commentid)
  } else if (commentUserId) {
    return getCommentUser(commentUserId)
  }
  const 
  try {
    const allComments = await fetchAllComments()
    // console.log('these are all Comments', allComments);
    res.json(allComments)
  } catch (e) {
    throw new Error(e)
  }
};

const getCommentId = async (req, res) => {
  const commentid = req.params
  try {
    const commentsIds = await fetchCommentId(commentid)
    // console.log(commentsIds);
    console.log(res.json(commentsIds));
  } catch (e) {
    throw new Error(e)
  }
};

const getCommentUser = async (req, res) => {
  const commentUserId = req.params;
  try {
    const commentUser = await fetchCommentUser(commentUserId);
    res.json(commentUser)
  } catch (e) {
    throw new Error(e)
  }
};

module.exports = {
  getAllComments,
  getCommentId,
  getCommentUser,
}