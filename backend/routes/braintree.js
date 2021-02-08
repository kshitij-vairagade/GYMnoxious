const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth.controller');
const {userById} = require("../controllers/user.controller");
const {generateToken} = require("../controllers/braintree");

router.get('/braintree/getToken/:userId',requireSignin, isAuth, generateToken)



router.param('userId', userById)

module.exports = router;