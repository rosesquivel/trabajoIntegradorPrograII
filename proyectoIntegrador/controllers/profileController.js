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
        if (req.session.user != undefined){
            return res.redirect('/');
        } else {
            return res.render('register');
        };
    },
    store: function(req,res){
        let form = req.body;

        //Recopilo los datos del form
        let user = {
            username: form.username,
            email:form.email,
            password: bcriptjs.hashSync(form.password, 10), //encripto la contraseña
            profilePicture: form.profilePicture,
            bDate: form.bDate,
            dni: form.dni,
            phone: form.phone,
        }

        //Guardo mis datos con el método Create
        db.User.create(user)
            .then(function(newUser){
                    return res.redirect('/profile/login');
            })
            .catch(function(error){
                console.log(error);
            })

        //let errors = {}
    },
    login: function(req,res){
        //Si el usuario está logueado, ir al inicio, de lo contrario, mostrar el form de login
        if (req.session.user != undefined){
            return res.redirect('/');
        } else {
            return res.render('login');
        };
    },
    processLogin: function(req, res){ 
        let form = req.body;

        //Busco los datos en la database
        db.User.findOne({
            where: [{email: form.email}]
        })

        .then(function(oldUser){
            let errors = {}
        
            if (oldUser == null){
                //Validar el email antes de loguear
                errors.message = "El email ingresado no existe"
                res.locals.errors = errors;
                return res.render('login');
            } else {
                //Validar la contraseña antes de loguear
                let compare = bcriptjs.compareSync(form.password, oldUser.password)
                
                if(compare){
                    //Ponerlos en session.
                    req.session.user = {
                        email: oldUser.email,
                        username: oldUser.username,
                    }
                    //Preguntar si el usuario tildó el checkbox para recordarlo
                    if(form.recordarme != undefined){
                        res.cookie('userId', 'result.dataValues', {maxAge: 1000 * 60 * 100})
                    }
                    //Y si el usuario quiere, agregar la cookie para que lo recuerde.
                    return res.redirect('/');
                } else {
                    errors.message = "La contraseña ingresada es incorrecta.";
                    res.locals.errors = errors;
                    return res.render('login');
                };
        }})
        .catch(function(error){
            console.log(error);
        })
    }

    /* logout: */

};

module.exports = profileController;