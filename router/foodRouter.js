const foodCtrl=require("../controllers/foodCtrl");
const router=require("express").Router();

router.post('/sellerregister',foodCtrl.register);
router.patch('/restaurantregister',foodCtrl.registerrestaurant);
router.patch('/foodlisting',foodCtrl.listfooditems);
router.get('/sellerprofile',foodCtrl.sellerprofile)
module.exports=router;


