let express = require('express');
let router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/', profileController.profile);
router.get('/edit', profileController.edit);
router.get('/register', profileController.register);
router.get('/login', profileController.login);

router.post('/register', profileController.store); //Guarda al usuario en la base de datos.
/* router.post('/login', profileController.processLogin) //Mostrar form de login
router.post('/logout', profileController.logout) */

module.exports = router;