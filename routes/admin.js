const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', 
[
    body('title')
    .isLength( {min: 5 }).withMessage('Product title must be at least 5 characters long.')
    .trim(),
    body('price')
    .trim()
    .isCurrency({ allow_negatives: false }).withMessage('Please enter a valid currency amount.'),
    body('description')
    .isLength( {min: 5 }).withMessage('Product description must be at least 5 characters long.')
    .trim()
],
isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId',
[
    body('title')
    .isLength( {min: 5 }).withMessage('Product title must be at least 5 characters long.')
    .trim(),
    body('price')
    .trim()
    .isCurrency({ allow_negatives: false }).withMessage('Please enter a valid currency amount.'),
    body('description')
    .isLength( {min: 5 }).withMessage('Product description must be at least 5 characters long.')
    .trim()
],
isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
