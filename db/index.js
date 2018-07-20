const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect();

// Get item by ID:
const getItembyID = function(id, callback) {
  connection.query('select * from items where id = ?', [id], callback);
}

module.exports = {
  getItembyID
};
