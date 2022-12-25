const database = require('../config/database');

class TenderModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS total FROM tender`;
      database.query(sql, (err, result) => {
        resolve(result[0].total);
      })
    });
  }

  // static countByNPWP(id) {
  //   return new Promise((resolve) => {
  //     const sql = `SELECT COUNT(tender.id_tender) AS total FROM tenderpl_tenderp.peserta_tender JOIN tenderpl_tenderp.tender ON peserta_tender.id_tender = tender.id_tender WHERE peserta_tender.npwp IN (SELECT npwp FROM tenderpl_tenderp.anggota_asosiasi WHERE id_pengguna = ?);`;
  //     database.query(sql, id, (err, result) => {
  //       resolve(result[0].total);
  //     })
  //   });
  // }

  static active() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(DISTINCT peserta_tender.id_tender) AS active FROM tenderpl_tenderp.peserta_tender JOIN tenderpl_tenderp.tender ON peserta_tender.id_tender = tender.id_tender WHERE peserta_tender.harga_penawaran != 0 AND tender.status NOT IN ('Tender Sudah Selesai', 'Seleksi Batal', 'Tender Gagal', 'Seleksi Gagal', 'Tender Batal');`;
      database.query(sql, (err, result) => {
        const [total] = result;
        resolve(total);
      })
    });
  }

  static activeByNPWP(id) {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(DISTINCT peserta_tender.id_tender) AS active FROM tenderpl_tenderp.peserta_tender JOIN tenderpl_tenderp.tender ON peserta_tender.id_tender = tender.id_tender WHERE peserta_tender.npwp IN (SELECT npwp FROM tenderpl_tenderp.anggota_asosiasi WHERE id_pengguna = ?) AND peserta_tender.harga_penawaran != 0 AND tender.status NOT IN ('Tender Sudah Selesai', 'Seleksi Batal', 'Tender Gagal', 'Seleksi Gagal', 'Tender Batal');`;
      database.query(sql, id, (err, result) => {
        const [total] = result;
        resolve(total);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT tender.*, detail_tender.id_detail_tender, detail_tender.satker, detail_tender.nilai_pagu, detail_tender.lokasi_pekerjaan, detail_tender.kab_pekerjaan, detail_tender.prov_pekerjaan, detail_tender.cara_bayar, detail_tender.jumlah_peserta, jenis_tender.jenis_tender
      FROM tender 
      INNER JOIN detail_tender ON tender.id_tender = detail_tender.id_tender 
      INNER JOIN jenis_tender ON tender.id_jenis = jenis_tender.id_jenis
      ORDER BY tender.tgl_pembuatan DESC
      LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static timeSeries(npwp, year) {
    return new Promise((resolve) => {
      const sql = `SELECT tender.*, detail_tender.id_detail_tender, detail_tender.satker, detail_tender.nilai_pagu, detail_tender.lokasi_pekerjaan, detail_tender.kab_pekerjaan, detail_tender.prov_pekerjaan, detail_tender.cara_bayar, detail_tender.jumlah_peserta FROM tender INNER JOIN detail_tender ON tender.id_tender = detail_tender.id_tender JOIN peserta_tender ON tender.id_tender = peserta_tender.id_tender WHERE peserta_tender.npwp = ${npwp} AND YEAR(tender.tgl_pembuatan) = ${year};`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT tender.*, detail_tender.id_detail_tender, detail_tender.satker, detail_tender.nilai_pagu, detail_tender.lokasi_pekerjaan, detail_tender.kab_pekerjaan, detail_tender.prov_pekerjaan, detail_tender.cara_bayar, detail_tender.jumlah_peserta FROM tender INNER JOIN detail_tender ON tender.id_tender = detail_tender.id_tender WHERE tender.id_tender = ?`;
      database.query(sql, id, (err, results) => {
        const [data] = results
        resolve(data)
      })
    })
  }

  static findTenderByNPWP(npwp) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT tender.*, detail_tender.id_detail_tender, detail_tender.satker, detail_tender.nilai_pagu, detail_tender.lokasi_pekerjaan, detail_tender.kab_pekerjaan, detail_tender.prov_pekerjaan, detail_tender.cara_bayar, detail_tender.jumlah_peserta FROM tenderpl_tenderp.tender JOIN tenderpl_tenderp.peserta_tender ON tender.id_tender = peserta_tender.id_tender JOIN tenderpl_tenderp.detail_tender ON tender.id_tender = detail_tender.id_tender  WHERE peserta_tender.npwp = ?; `;
      database.query(sql, npwp, (err, results) => {
        resolve(results)
      })
    })
  }
}

module.exports = TenderModel; 