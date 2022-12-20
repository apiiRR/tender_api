const database = require('../config/database');

class LPSEModel {

  static findByName(name) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM lpse WHERE nama_lpse LIKE '%'${name}'%'`;
      database.query(sql, (err, results) => {
        resolve(results);
      })
    })
  }
}

module.exports = LPSEModel; 