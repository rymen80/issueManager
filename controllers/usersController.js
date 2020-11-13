const {
  fetchUsers,
  fetchUserByIdFromDb,
  insertUserToDb,
  deleteUserByIdFromDb,
  isAdminUser,
  fetchUsersInProject,
  updateUserInDb,
} = require("../model/userOrm");


async function getUserByUserIdAPI(req,res){
  const { userid } = req.params;
  try {    
      user = await fetchUserByIdFromDb(userid);
      res.json(user);    
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }

}

async function getAllUsersAPI(req, res) {
  try {
    let users;
    if (isNaN(parseInt(req.query.projectid))) {
      users = await fetchUsers();
      res.json(users);
    } else {
      const users = await fetchUsersInProject(parseInt(req.query.projectid));
      res.json(users);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function insertUserAPI(req, res) {
  const { username, password, firstname, lastname, phone } = req.body;
  if (!req.user.isadmin) {
    return res.status(403).json("admin previlege is required");
  }
  try {
    const users = await insertUserToDb(
      username,
      password,
      firstname,
      lastname,
      phone
    );
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function updateUserAPI(req, res) {
  const { password, firstname, lastname, phone } = req.body;
  const { userid } = req.params;
  if (!req.user.isadmin && req.user.id !== parseInt(userid)) {
    return res
      .status(403)
      .json(
        "you are authorized to update only your user.To update other user admin previlege is required."
      );
  }
  try {
    const users = await updateUserInDb(
      password,
      firstname,
      lastname,
      phone,
      parseInt(userid)
    );
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function deleteUserAPI(req, res) {
  const { userid } = req.params;
  if (!req.user.isadmin) {
    return res.status(403).json("admin previlege is required");
  }
  try {
    const users = await deleteUserByIdFromDb(parseInt(userid));
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  getUserByUserIdAPI,
  getAllUsersAPI,
  insertUserAPI,
  updateUserAPI,
  deleteUserAPI,
};
