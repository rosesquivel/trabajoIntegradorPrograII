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
        let form = req.body;

        //Recopilo los datos del form
        let user = {
            username: form.username,
            email:form.email,
            password: bcriptjs.hashSync(form.password, 10),
            profilePicture: form.profilePicture,
            bDate: form.bDate,
            dni: form.dni,
            phone: form.phone,
        }

        //Usar un método de Sequelize para guardar datos.
        db.User.create(user)
            .then(function(newUser){
                    return res.redirect('/profile/login');
            })
            .catch(function(error){
                console.log(error);
            })

        let errors = {}

    },
    login: function(req,res){
        return res.render('login')
        /* if(req.session.user != undefined){
            return res.redirect('/')
        } else {
            return res.render('login');
        } */
    },
    processLogin: function(req, res){
        db.User.findOne({
            where: [{email: req.body.email}]
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
                let compare = bcriptjs.compareSync(req.body.password, oldUser.password)
                
                if(compare){
                    //Ponerlos en session.
                    req.session.user = {
                        email: oldUser.email,
                        username: oldUser.username,
                    }
                    //Preguntar si el usuario tildó el checkbox para recordarlo
                    if(req.body.recordarme != undefined){
                        res.cookie('cookieEspecial', 'el dato que quiero guardar', {maxAge: 1000*60*123123123})
                    }
                    //Y si el usuario quiere, agregar la cookie para que lo recuerde.
                    return res.redirect('/');
                    } else {
                    errors.message = "La contraseña ingresada es incorrecta.";
                    res.locals.errors = errors;
                    return res.render('login');
                }
            }           

           })
           .catch(function(e){
            console.log(e);
           }) 
    
    }

    /* logout: */

};

module.exports = profileController;