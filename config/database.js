const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: "sv2.ecc.co.id",
  user: "tenderpl_mobile",
  password: "U4drzPGd1Tlq",
  database: "tenderpl_tenderp"
});

db.connect((err) => {
  if (err) {
    console.log(`Connection Error : ${err}`);
    return;
  } else {
    console.log(`Connection Success`);
    return;
  }
});

module.exports = db;