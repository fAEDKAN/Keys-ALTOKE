var express = require('express');
var router = express.Router();

//REQUIRE CONTROLLERS - MIDDLEWARES - VALIDATIONS
const {index, getProductsByCategory, productDetail, productsLoad, create, productEdit, update, cart, cartAdress, cartPay, destroy} = require('../controllers/productsController');
const uploadProducts =require('../middlewares/uploadFilesProducts');
const adminCheck =require('../middlewares/adminCheck');
const productValidator = require('../validations/productValidator');


//GET PRODUCT
router.get('/', index);
router.get('/category/:id', getProductsByCategory)
//PRODUCTS DETAIL
router.get('/productDetail/:id', productDetail);

//PRODUCTS lOAD
router.get('/productsLoad', productsLoad)
router.post('/productsLoad', uploadProducts.array('imagen'), productValidator, create);

//PRODUCT EDIT
router.get('/productEdit/:id', adminCheck, productEdit);
router.put('/update/:id', uploadProducts.array('imagen'),productValidator, update);

//PRODUCT DELETE
router.delete('/deleteProduct/:id', destroy);

//CART
router.get('/cart', cart);
router.get('/cartAdress', cartAdress);
router.get('/cartPay', cartPay);


module.exports = router;