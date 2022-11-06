const userCtrl = require("../controllers/userCtrl");
const router=require("express").Router();
const auth = require("../middleware/auth");

router.post('/register',userCtrl.register);
router.get("/getuser", auth, userCtrl.getUsers);
router.post('/verify/send',userCtrl.sendOTP);
router.post('/verify',userCtrl.verify);
router.post('/signin',userCtrl.signin);
// router.post('/verify/send',userCtrl.sendOTP);
// router.post('/verify',userCtrl.verify);
router.post('/forgot/send',userCtrl.forgotsendOTP);
router.post('/forgot/verify',userCtrl.forgotverify);
router.post('/forgot/reset',userCtrl.resetpass);
// router.post('/forgot',userCtrl.resetpass);
router.post('/logout',userCtrl.logout);
router.get("/refresh_token", userCtrl.refreshToken);
// router.post('/forgot',userCtrl.verify);

module.exports = router;