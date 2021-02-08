const express = require('express');
const router = express.Router();

const {
    create,
    categoryById,
    read,
    update,
    remove,
    list
} = require("../controllers/category.controller")

const { requireSignin, isAdmin, isAuth } = require('../controllers/auth.controller');

const {userById} = require("../controllers/user.controller")

router.get('/category/:categoryId', read)
router.get('/categories', list)
router.post('/category/create/:userId', requireSignin, isAuth,isAdmin,create)
router.put('/category/:categoryId/:userId', requireSignin, isAuth,isAdmin,update)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth,isAdmin,remove)


router.param('categoryId', categoryById)  
router.param('userId', userById)    

module.exports = router