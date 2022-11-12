const userCtrl = require("../controllers/userCtrl");
const router=require("express").Router();
const auth = require("../middleware/auth");
const Upload = require('../middleware/upload');


router.post('/register',userCtrl.register);
// router.get("/getuser", auth, userCtrl.getUsers);
router.post('/verify/send',userCtrl.sendOTP);
router.post('/verify',userCtrl.verify);
router.post('/signin',userCtrl.signin);
// router.post('/verify/send',userCtrl.sendOTP);
// router.post('/verify',userCtrl.verify);
router.post('/forgot/send',userCtrl.forgotsendOTP);
router.post('/forgot/verify',userCtrl.forgotverify);
router.post('/forgot/reset',userCtrl.resetpass);
// router.post('/forgot',userCtrl.resetpass);
// router.post('/logout',userCtrl.logout);
// router.get("/refresh_token", userCtrl.refreshToken);
// router.post('/forgot',userCtrl.verify);
router.post("/userprofile",auth,userCtrl.userprofile);
router.post("/profileimage",auth,Upload.uploadImg.single('image'),userCtrl.profileimage);
router.post("/addtocart",auth,userCtrl.addtocart);
router.post("/removefromcart",auth,userCtrl.removefromcart);
router.post("/viewcart",auth,userCtrl.viewcart);
router.post("/fooditemcount",auth,userCtrl.send_count_of_fooditem);
router.post("/location",auth,userCtrl.location);
router.get("/feed",auth,userCtrl.feed);
router.get("/restaurant/:id",auth,userCtrl.restaurant);
router.post("/checkout",auth,userCtrl.checkout);
router.post("/search",auth,userCtrl.search);
router.post("/fooddetails",auth,userCtrl.fooddetails);

module.exports = router;