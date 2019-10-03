const config = require ('../config');
const mysql = require('mysql');

var connect  = mysql.createPool({
    connectionLimit : 10,
    queuLimit       : 100,
    host            : config.host,
    port            : config.port,
    user            : config.uname,
    password        : config.upass,
    database        : config.db
  });

  module.exports = connect;