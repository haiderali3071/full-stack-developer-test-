var express = require('express');
var router = express.Router();
const authCtrl = require('../controllers/auth')

router.post("/register",  authCtrl.registerController);
router.post("/login",  authCtrl.loginController);

module.exports = router;
