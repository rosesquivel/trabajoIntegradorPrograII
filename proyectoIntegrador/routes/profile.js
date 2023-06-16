let express = require('express');
let router = express.Router();
let profileController = require('../controllers/profileController');

//Rutas con get
router.get('/id/:id', profileController.profile);
router.get('/edit/:id', profileController.edit);
router.get('/register', profileController.register);
router.get('/login', profileController.login);
router.get('/searchresults', profileController.searchUsers);

//Rutas con post
router.post('/edit/:id', profileController.editProfile);
router.post('/register', profileController.storeRegister); //Guarda al usuario en la base de datos.
router.post('/login', profileController.processLogin) //Crearle una session al usuario
router.post('/logout', profileController.logout) //Eliminar la session del usuario

module.exports = router;
