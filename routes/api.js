const express = require('express');
const DetailTenderController = require("../controller/detail_tender_controller");
const JadwalController = require("../controller/jadwal_controller");
const JenisTenderController = require("../controller/jenis_tender_controller");
const KategoriLPSEController = require("../controller/kategori_lpse_controller");
const LPSEController = require("../controller/lpse_controller");
const PemenangController = require("../controller/pemenang_controller");
const PenggunaController = require("../controller/pengguna_controller");
const PerubahanJadwalController = require("../controller/perubahan_jadwal_controller");
const PesertaController = require("../controller/peserta_controller");
const PesertaTenderController = require("../controller/peserta_tender_controller");
const PreferensiController = require("../controller/preferensi_controller");
const RUPController = require("../controller/rup_controller");
const SyaratKualifikasiController = require("../controller/syarat_kualifikasi_controller");
const TahapanController = require("../controller/tahapan_controller");
const TenderController = require("../controller/tender_controller");
const WilayahController = require("../controller/wilayah_controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Halo Anak Ganteng");
});

router.get('/detail_tender', DetailTenderController.index);
router.get('/detail_tender/:id', DetailTenderController.showById);

router.get('/jadwal', JadwalController.index);
router.get('/jadwal/:id', JadwalController.showById);

router.get('/jenis_tender', JenisTenderController.index);
router.get('/jenis_tender/:id', JenisTenderController.showById);

router.get('/kategori_lpse', KategoriLPSEController.index);
router.get('/kategori_lpse/:id', KategoriLPSEController.showById);

router.get('/lpse', LPSEController.index);
router.get('/lpse/:id', LPSEController.showById);

router.get('/pemenang', PemenangController.index);
router.get('/pemenang/:id', PemenangController.showById);

router.get('/pengguna', PenggunaController.index);
router.get('/pengguna/:id', PenggunaController.showById);

router.get('/perubahan_jadwal', PerubahanJadwalController.index);
router.get('/perubahan_jadwal/:id', PerubahanJadwalController.showById);

router.get('/peserta', PesertaController.index);
router.get('/peserta/:id', PesertaController.showById);

router.get('/peserta_tender', PesertaTenderController.index);
router.get('/peserta_tender/:id', PesertaTenderController.showById);

router.get('/preferensi', PreferensiController.index);
router.get('/preferensi/:id', PreferensiController.showById);

router.get('/rup', RUPController.index);
router.get('/rup/:id', RUPController.showById);

router.get('/syarat_kualifikasi', SyaratKualifikasiController.index);
router.get('/syarat_kualifikasi/:id', SyaratKualifikasiController.showById);

router.get('/tahapan', TahapanController.index);
router.get('/tahapan/:id', TahapanController.showById);

router.get('/tender', TenderController.index);
router.get('/tender/:id', TenderController.showById);

router.get('/wilayah', WilayahController.index);
router.get('/wilayah/:id', WilayahController.showById);

module.exports = router;