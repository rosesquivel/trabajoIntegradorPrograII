let express = require('express');
let router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/', profileController.profile);
router.get('/edit', profileController.edit);
router.get('/register', profileController.register);
router.get('/register', profileController.store);
router.get('/login', profileController.login);

module.exports = router;