const express = require('express');
const router = express.Router();

const {
    create,
    serviceById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch
} = require("../controllers/service.controller")

const { requireSignin, isAdmin, isAuth } = require('../controllers/auth.controller');

const {userById} = require("../controllers/user.controller")


router.get('/service/:serviceId', read)
router.post('/service/create/:userId', requireSignin, isAuth, isAdmin,create);
router.delete('/service/:serviceId/:userId', requireSignin, isAuth, isAdmin,remove)
router.put('/service/:serviceId/:userId', requireSignin, isAuth, isAdmin,update)
router.get('/services', list)
router.get('/services/related/:serviceId', listRelated)
router.get('/services/categories', listCategories)
router.get('/services/search', listSearch);


router.post('/services/by/search', listBySearch);
router.get("/service/photo/:serviceId",photo)

router.param('userId', userById)    
router.param('serviceId', serviceById)    

module.exports = router