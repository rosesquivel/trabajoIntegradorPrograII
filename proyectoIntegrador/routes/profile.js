let express = require('express');
let router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/', profileController.profile);
router.get('/edit', profileController.edit);
router.get('/register', profileController.register);
router.get('/login', profileController.login);

router.post('/register', profileController.store); //Guarda al usuario en la base de datos.
router.post('/login', profileController.processLogin) //Crearle una session al usuario
router.post('/logout', profileController.logout) //Eliminar la session del usuario

module.exports = router;
