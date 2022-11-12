const foodCtrl=require("../controllers/foodCtrl");
const router=require("express").Router();
const Upload = require('../middleware/upload');

router.post('/register',foodCtrl.register);
router.post('/restaurantregister',Upload.uploadImg.array('image',5),foodCtrl.registerrestaurant);
router.post('/foodlisting',Upload.uploadImg.single('image'), foodCtrl.listfooditems);
router.post('/verify/send',foodCtrl.sendOTP);
router.post('/verify',foodCtrl.verify);
router.post('/signin',foodCtrl.signin);

router.post('/forgot/send',foodCtrl.forgotsendOTP);
router.post('/forgot/verify',foodCtrl.forgotverify);
router.post('/forgot/reset',foodCtrl.resetpass);
router.post('/sellerprofile',foodCtrl.sellerprofile);
router.post('/removefromorders',foodCtrl.removefromorders);
module.exports=router;


