const userCtrl = require("../controllers/userCtrl");
const router=require("express").Router();

router.post('/register',userCtrl.register);
router.post('/signin',userCtrl.signin);

module.exports = router;
