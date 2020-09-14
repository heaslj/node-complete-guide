const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin');
const productController = require('../controllers/product');

router.get('/', productController.getProducts);

module.exports = router;
