let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController');

router.get('/', productsController.products);
router.get('/add', productsController.add);
router.get('/searchresults', productsController.results);

module.exports = router;