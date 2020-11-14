const findAllLabelQuery = 'SELECT * FROM label;';

const findLabelIdQuery = 'SELECT * FROM label where id = ?;';

module.exports = {
  findAllLabelQuery,
  findLabelIdQuery,
}