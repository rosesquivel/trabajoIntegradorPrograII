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
        };

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
        /* RECOPILO DATOS DEL FORM DEL LOGIN */
        let form = req.body;

        db.User.findOne({
            where: [{email: form.email}]
        })

        .then(function(userFound){        
            let errors = {}; //OL de errores

            if (userFound == undefined){ //USER NO EXISTE EN LA DB
                errors.message = "El email ingresado no existe";
                res.locals.errors = errors;
                return res.render('login');
            } else {
                //PASSWORD NO COINCIDE CON LA DB
                let compare = bcriptjs.compareSync(form.password, userFound.password) 
                if(compare == true){
                    //Pongo al user en session
                    req.session.user = {
                        email: form.email,
                        username: form.username,
                    }
                    //Preguntar si el usuario tildó el checkbox para recordarlo
                    if(form.recordarme != undefined){
                        res.cookie('recordarme', 'req.session.user', {maxAge: 1000 * 60 * 100})
                    } 
                    return res.redirect('/');
                } else {
                    errors.message = "La contraseña ingresada es incorrecta";
                    res.locals.errors = errors;
                    return res.render('login');
                };
        }})
        .catch(function(error){
            console.log(error);
        }) 
    },
    logout: function(req, res){
        req.session.destroy(); //destruyo la session
        return res.redirect('/'); 
    } 
};

module.exports = profileController;