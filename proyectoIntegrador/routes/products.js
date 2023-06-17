let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController');

//Rutas con get
router.get('/id/:id', productsController.product);
router.get('/add', productsController.add);
router.get('/edit/:id', productsController.edit);
router.get('/searchresults', productsController.searchProducts);

//Rutas con post
router.post('/add', productsController.storeProduct);
router.post('/comment/:id', productsController.storeComment);
router.post('/edit/:id', productsController.productEdit);
router.post('/delete', productsController.productDelete)

module.exports = router;