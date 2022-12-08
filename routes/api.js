const express = require('express');
const JadwalController = require("../controllers/jadwal_controller");
const PesertaTenderController = require("../controllers/peserta_tender_controller");
const TenderController = require("../controllers/tender_controller");
const UserController = require("../controllers/user_controller");
const PemenangController = require("../controllers/pemenang_controller");
const AuthenticateAccessToken = require("../controllers/middleware/verify");
const {
  userLoginValidationRules,
  userRegisterValidationRules,
  patientInsertValidationRules,
  validate
} = require("../controllers/middleware/validator");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
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

router.get('/pemenang/time_series', PemenangController.timeSeriesByYear);

router.post("/register", userRegisterValidationRules(), validate, UserController.register);
router.post("/login", userLoginValidationRules(), validate, UserController.login);

router.get('/pengguna/:email', AuthenticateAccessToken, UserController.showById);

module.exports = router;