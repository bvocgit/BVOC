const mysql = require("mysql2");

module.exports = connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    database: 'post_app',
    password:'Nish@1308',
});

