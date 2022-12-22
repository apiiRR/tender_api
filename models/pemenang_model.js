const database = require('../config/database');

class PemenangModel {
  static pemenangTender(npwp, year) {
    return new Promise((resolve) => {
      const sql = `SELECT pemenang.*, data.* FROM tenderpl_tenderp.pemenang JOIN (
        SELECT peserta_tender.*, tender.nama_tender, tender.nilai_kontrak, tender.nilai_hps FROM tenderpl_tenderp.tender JOIN tenderpl_tenderp.peserta_tender ON tender.id_tender = peserta_tender.id_tender WHERE peserta_tender.npwp = ${npwp} AND YEAR(tender.tgl_pembuatan) = ${year}
        ) AS data ON pemenang.id_tender = data.id_tender WHERE pemenang.npwp = ${npwp};`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static jumlahPemenangTenderByNPWP(npwp) {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS pemenang FROM tenderpl_tenderp.pemenang WHERE npwp = ${npwp}`;
      database.query(sql, (err, result) => {
        const [pemenang] = result;
        resolve(pemenang);
      });
    });
  }

  static jumlahTenderByNPWP(npwp) {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS jumlah FROM tenderpl_tenderp.peserta_tender WHERE npwp = ${npwp}`;
      database.query(sql, (err, result) => {
        const [tender] = result;
        resolve(tender);
      });
    });
  }

  static jumlahKalahTenderByNPWP(npwp) {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS kalah FROM tenderpl_tenderp.pemenang WHERE id_tender IN (SELECT id_tender FROM tenderpl_tenderp.peserta_tender WHERE npwp = ${npwp} AND harga_penawaran != 0) AND npwp != ${npwp}`;
      database.query(sql, (err, result) => {
        const [kalah] = result;
        resolve(kalah);
      });
    });
  }

  static jumlahTenderIkutByNPWP(npwp) {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS ikuti FROM tenderpl_tenderp.peserta_tender JOIN tenderpl_tenderp.tender ON peserta_tender.id_tender = tender.id_tender WHERE peserta_tender.npwp = ${npwp} AND peserta_tender.harga_penawaran != 0 AND tender.status NOT IN ('Tender Sudah Selesai', 'Seleksi Batal', 'Tender Gagal', 'Seleksi Gagal', 'Tender Batal');`;
      database.query(sql, (err, result) => {
        const [ikuti] = result;
        resolve(ikuti);
      });
    });
  }

  static pemenangTenderAll() {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM pemenang;`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static pemenangTenderByStatusTTDKontrak() {
    return new Promise((resolve) => {
      const sql = `SELECT pemenang.*, tender.nama_tender, tender.nilai_kontrak, tender.nilai_hps FROM tenderpl_tenderp.pemenang JOIN (SELECT jadwal.*, tahapan.nama_tahapan FROM tenderpl_tenderp.jadwal JOIN tenderpl_tenderp.tahapan ON jadwal.id_tahapan = tahapan.id_tahapan WHERE jadwal.id_tahapan = 12 AND DATEDIFF(CURDATE(), jadwal.tgl_mulai) <= 7) AS jadwal_tahapan ON pemenang.id_tender = jadwal_tahapan.id_tender JOIN tenderpl_tenderp.tender ON pemenang.id_tender = tender.id_tender;`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS total FROM pemenang`;
      database.query(sql, (err, result) => {
        const [total] = result
        resolve(total);
      })
    });
  }
}

module.exports = PemenangModel; 