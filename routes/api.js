const express = require('express');
const DetailTenderController = require("../controller/detail_tender_controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Halo Anak Ganteng");
});

router.get('/detail_tender', DetailTenderController.index);
router.get('/detail_tender/:id', DetailTenderController.showById);

module.exports = router;