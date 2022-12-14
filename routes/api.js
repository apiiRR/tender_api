const express = require('express');
const JadwalController = require("../controllers/jadwal_controller");
const PesertaTenderController = require("../controllers/peserta_tender_controller");
const TenderController = require("../controllers/tender_controller");
const UserController = require("../controllers/user_controller");
const PemenangController = require("../controllers/pemenang_controller");
const DashboardUserController = require("../controllers/dashboard_user_controller");
const DashboardSupplierController = require("../controllers/dashboard_supplier_controller");
const DashboardAsosiasiController = require("../controllers/dashboard_asosiasi_controller");
const LPSEController = require("../controllers/lpse_controller");
const AnggotaController = require("../controllers/anggota_controller");
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

router.get('/dashboard_user/total/:npwp', DashboardUserController.getTotal);
router.get('/dashboard_user/riwayat_tender/:npwp', DashboardUserController.getRiwayat);

router.get('/dashboard_supplier/total', DashboardSupplierController.getTotal);
router.get('/dashboard_supplier/pemenang', DashboardSupplierController.getPemenang);

router.get('/dashboard_asosiasi/total/:id', DashboardAsosiasiController.getTotal);
router.get('/dashboard_asosiasi/detail/:npwp', DashboardAsosiasiController.getTotalById);

router.get('/lpse/search', LPSEController.showByName);
router.get('/lpse/total/:id', LPSEController.countByLPSE);

router.get('/anggota/:id', AnggotaController.showById);
router.post('/anggota', AnggotaController.create);
router.delete('/anggota/:id', AnggotaController.destroy);

router.post("/register", userRegisterValidationRules(), validate, UserController.register);
router.post("/login", userLoginValidationRules(), validate, UserController.login);

router.get('/pengguna/id/:id', UserController.showById);
router.get('/pengguna/email/:email', UserController.showByEmail);
router.put('/pengguna/:id', UserController.update);
router.put('/pengguna/change_password/:id', UserController.updatePassword);

module.exports = router;