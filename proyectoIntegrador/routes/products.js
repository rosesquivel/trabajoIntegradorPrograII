let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController');

router.get('/id/:id', productsController.product);
router.get('/add', productsController.add);
router.get('/edit', productsController.edit);
router.get('/searchresults', productsController.search);

module.exports = router;