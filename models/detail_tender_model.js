const database = require('../config/database');

class DetailTenderModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM detail_tender`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM detail_tender LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT detail_tender.*, rup.id_rup, rup.nama_paket, rup.sumber_dana FROM detail_tender INNER JOIN rup ON detail_tender.id_tender = rup.id_tender WHERE detail_tender.id_tender = ?`;
      database.query(sql, id, (err, results) => {
        const [data] = results
        resolve(data)
      })
    })
  }
}

module.exports = DetailTenderModel; 