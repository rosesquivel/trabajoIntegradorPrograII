let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController');

//Rutas con get
router.get('/id/:id', productsController.product);
router.get('/add', productsController.add);
router.get('/edit', productsController.formEdit);
router.get('/searchresults', productsController.search);

//Rutas con post
router.post('/add', productsController.storeProduct);
router.post('/comment/:id', productsController.storeComment);
router.post('/edit', productsController.productEdit);
router.post('/delete', productsController.productDelete)


module.exports = router;