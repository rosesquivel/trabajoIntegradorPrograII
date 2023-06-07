const { name } = require("ejs");
let db = require("../database/models");
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let profileController = {
    profile: function(req, res){
        // return res.render('profile', {
        //     product: db.products,
        //     users: db.users
        // })
    },
    edit: function(req, res){
        // return res.render('profile-edit', {
        //     users: db.users
        // })
    },
    register: function(req, res){
        return res.render('register')
    },
    store: function(req,res){
        let form = req.body

        //Encriptar la contraseña antes de guardar en la base de datos.
        let user = {
            email:form.email,
            username: form.username,
            password: bcriptjs.hashSync(form.password, 10),
        }

        //Usar un método de Sequelize para guardar datos.
        db.User.create(user) //Pasar un objeto literal con los datos a guardar.
            .then(function(usuarioCreado){ //retorna el elemento creado
                //Dentro del then debería redireccionar a otra ruta.
                console.log(usuarioCreado);
                    // return res.send(form);
                return res.redirect('/register');
            })
            .catch(function(error){
                console.log(error);
            })

    },
    login: function(req,res){
        return res.render('login')
    }
};

module.exports = profileController;