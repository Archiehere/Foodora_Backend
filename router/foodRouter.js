const foodCtrl=require("../controllers/foodCtrl");
const router=require("express").Router();

router.post('/register',foodCtrl.register);
router.patch('/restaurantregister',foodCtrl.registerrestaurant);
router.patch('/foodlisting',foodCtrl.listfooditems);
router.post('/verify/send',foodCtrl.sendOTP);
router.post('/verify',foodCtrl.verify);
router.post('/signin',foodCtrl.signin);

router.post('/forgot/send',foodCtrl.forgotsendOTP);
router.post('/forgot/verify',foodCtrl.forgotverify);
router.post('/forgot/reset',foodCtrl.resetpass);
router.post('/sellerprofile',foodCtrl.sellerprofile)
module.exports=router;


