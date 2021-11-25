const express = require('express');
const router = express.Router();
const { create1, read, list, categoryById, readSingleCategory, categoryPhoto } = require('../controllers/category')
const { productByCategory } = require('../controllers/product')

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById } = require('../controllers/user');
const { readCategoryRelatedProducts } = require('../controllers/category')


router.post('/category/create/:userId', [requireSignin, isAuth, isAdmin, create1])
router.get('/category/:userId', read)
router.get('/category/read/:categoryId', readSingleCategory)
router.get("/category/photo/:categoryId", categoryPhoto)
router.get('/category_/:categoryId', readCategoryRelatedProducts)
router.get('/categories', list);
router.param('categoryId', categoryById);
router.param('userId', userById);


module.exports = router;