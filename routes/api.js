const express = require('express');
const DaftarHitamController = require('../controller/daftar_hitam_controller');

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Halo");
});

router.get('/daftar_hitam', DaftarHitamController.index);

module.exports = router;