const express = require('express');
const JadwalController = require("../controller/jadwal_controller");
const PesertaTenderController = require("../controller/peserta_tender_controller");
const TenderController = require("../controller/tender_controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Halo Anak Ganteng");
});

router.get('/jadwal', JadwalController.index);
router.get('/jadwal/:id', JadwalController.showById);

router.get('/peserta_tender', PesertaTenderController.index);
router.get('/peserta_tender/search', PesertaTenderController.showByName);
router.get('/peserta_tender/:id', PesertaTenderController.showById);

router.get('/tender', TenderController.index);
router.get('/tender/time_series', TenderController.timeSeriesByYear);
router.get('/tender/:id', TenderController.showById);

module.exports = router;