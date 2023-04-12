let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController');

router.get('/', productsController.product);
router.get('/add', productsController.add);
router.get('/edit', productsController.edit);
router.get('/searchresults', productsController.results);

module.exports = router;