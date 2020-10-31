const {
  insertFweetQuery,
  findAllFweetsQuery,
  findFweetByIdQuery,
  findFweetsByUserQuery,
  deleteFweetByIdQuery,
} = require('./fweetQueries');
const connection = require('../config/connection');


const findAllFweetsFromDb = async () => {
  try {
    const [ result ] = await connection.query(findAllFweetsQuery);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};


const findFweetByIdFromDb = async (fweetId) => {
  try {
    const [ result ] = await connection.query(findFweetByIdQuery, fweetId);
    return result[0];
  } catch (e) {
    throw new Error(e);
  }
};

const findFweetsByUserFromDb = async (userId) => {
  try {
    const [ result ] = await connection.query(findFweetsByUserQuery, userId);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};


const insertFweetToDb = async (fweet, userId) => {
  try {
    const [ result ] = await connection.query(insertFweetQuery, [fweet, userId ]);
    return await findFweetByIdFromDb(result.insertId);
  } catch (e) {
    throw new Error(e);
  }
};


const deleteFweetByIdFromDb = async (fweetId) => {
  try {
    // We cant just delete first if we delete first, we can't get the fweet anymore
    const deletedFweet = await findFweetByIdFromDb(fweetId);
    await connection.query(deleteFweetByIdQuery, fweetId);
    return deletedFweet;
  } catch (e) {
    throw new Error(e);
  }
};


module.exports = {
  findAllFweetsFromDb,
  findFweetByIdFromDb,
  findFweetsByUserFromDb,
  insertFweetToDb,
  deleteFweetByIdFromDb,
};
