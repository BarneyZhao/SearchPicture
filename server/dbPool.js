const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'myNas',
  user: 'root',
  password: '123456',
  connectionLimit: 5,
  multipleStatements: true,
});

module.exports = pool;
