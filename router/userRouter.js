const userCtrl = require("../controllers/userCtrl");
const router=require("express").Router();

router.post('/register',userCtrl.register);
router.post('/signin',userCtrl.signin);
router.post('/verify/send',userCtrl.sendOTP);
router.post('/verify',userCtrl.verify);
router.post('/forgot/verify/send',userCtrl.sendOTP);
router.post('/forgot/verify',userCtrl.verify);
// router.post('/forgot',userCtrl.resetpass);

module.exports = router;