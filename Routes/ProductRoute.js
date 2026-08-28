const express = require('express');
const router = express.Router();

const upload = require('../Middleware/upload');

// Authentication middleware
const { protect } = require('../Middleware/auth');

// Authorization middleware
const { authorize } = require('../Middleware/role');

// Product controller
const productController = require('../Controllers/productController');


// ==========================================
// CREATE PRODUCT
// ==========================================
router.post(
    '/createproduct',
   // protect,
    //authorize('admin'),
    productController.createproduct
);


// ==========================================
// CREATE PRODUCT WITH IMAGE
// ==========================================
router.post(
    '/createProductWithImage',
    protect,
    upload.single('image'),
    productController.createProductWithImage
);


// ==========================================
// GET ALL PRODUCTS
// ==========================================
router.get(
    '/getAllProducts',
    protect,
    productController.getAllProducts
);


// ==========================================
// GET PRODUCT BY ID
// ==========================================
router.get(
    '/getProductById/:id',
    protect,
    productController.getProductById
);


// ==========================================
// UPDATE PRODUCT
// ==========================================
router.put(
    '/updateproduct/:id',
    protect,
    authorize('admin'),
    productController.updateproduct
);


// ==========================================
// DELETE PRODUCT
// ==========================================
router.delete(
    '/deleteproduct/:id',
    protect,
    authorize('admin'),
    productController.deleteproduct
);


// Export router
module.exports = router;