const express = require('express');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth.controller');
const router = express.Router();

const {userById, read, update, purchaseHistory} = require("../controllers/user.controller")


router.get('/secret', requireSignin, isAdmin, isAuth,(req,res)=> {
    res.json({
        user: req.profile
    })
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param('userId',userById)


module.exports = router