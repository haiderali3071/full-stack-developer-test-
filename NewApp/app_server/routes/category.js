var express = require('express');
var router = express.Router();
const auth = require('../middlewares/authMiddleware')
const catCtrl = require('../controllers/category')

router.get('/', auth.verifyToken, catCtrl.load);

module.exports = router;
