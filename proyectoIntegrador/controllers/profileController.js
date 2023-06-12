const { name } = require("ejs");
let db = require("../database/models");
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let profileController = {
    profile: function(req, res){
        let rel ={
            include: [
                { association: 'user'}
            ]
        };

        //Me fijo quien es el usuario (busco el ID)
        let user = {where: [{userId: req.session.user.id}]}
       
        //Me fijo que productos tiene
        db.Product.findAll(user, rel)
        .then(function(productsAll){
            return res.send(productsAll)
            /* return res.render('profile', {
            product: productsAll
        }); */
        })
        .catch(function(error){
            console.log(error);
        })
    },
    edit: function(req, res){
        req
    },
    register: function(req, res){
        if (req.session.user != undefined){
            return res.redirect('/');
        } else {
            return res.render('register');
        };
    },
    store: function(req, res){ 
        /* RECOPILO DATOS DEL FORM DEL LOGIN */
        let form = req.body;
        let user = {
            username: form.username,
            email:form.email,
            password: bcriptjs.hashSync(form.password, 10), //encripto la contraseña
            profilePicture: form.profilePicture,
            bDate: form.bDate,
            dni: form.dni,
            phone: form.phone,
        };

        let errors = {};

        if(user.email == ''){
            errors.message = 'Debes ingresar un email'
            res.locals.errors = errors;
            return res.render('login');
        } else if (user.password == ''){
            errors.message = 'Debes ingresar una contraseña'
            res.locals.errors = errors;
            return res.render('login');
        } else if (user.password.length < 3){
            errors.message = 'La contraseña debe contener más de 3 dígitos'
            res.locals.errors = errors;
            return res.render('login');
        } else{
            db.User.findOne({
                where: [{email: form.email}]
            })

            .then(function(userFound){  
                      
                if (userFound != undefined){ //compara el email ingresado con los de la base de datos
                    errors.message = "El email ingresado ya existe";
                    res.locals.errors = errors;
                    return res.redirect('/register');
                } else { // si está todo ok
                    //Guardo los datos con el método Create
                    db.User.create(user)
                    .then(function(newUser){
                        return res.redirect('/login');
                    })
                    .catch(function(error){
                        console.log(error);
                    })
            }})
            .catch(function(error){
                console.log(error);
            });
        }  
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
        email = form.email;
        password = form.password;

        let errors = {};

        if(email == ''){
            errors.message = 'Debes ingresar un email'
            res.locals.errors = errors;
            return res.render('login');
        } else if (password == ''){
            errors.message = 'Debes ingresar una contraseña'
            res.locals.errors = errors;
            return res.render('login');
        } else{
            db.User.findOne({
                where: [{email: form.email}]
            })

            .then(function(userFound){        
                if (userFound != undefined){ //si el usuario esta ok, que evalue la contraseña
                    let compare = bcriptjs.compareSync(form.password, userFound.password);
                    if(compare){
                        //Pongo al user en session
                        req.session.user = userFound.dataValues;
                        //Preguntar si el usuario tildó el checkbox para recordarlo
                        if(form.recordarme != undefined){
                            res.cookie('userId', userFound.dataValues.id , {maxAge: 1000 * 60 * 100})
                        } 
                        return res.redirect('/');
                        } else {
                            errors.message = "Tu contraseña es incorrecta. Compruébala.";
                            res.locals.errors = errors;
                            return res.render('login');
                    };
                } else { //si el usuario está mal, que le avise
                    errors.message = "El email ingresado no existe";
                    res.locals.errors = errors;
                    return res.render('login');
            }})
            .catch(function(error){
                console.log(error);
            });
        }  
    },
    logout: function(req, res){
        req.session.destroy();//destruyo la session
        if(req.cookies.userId != undefined){
            res.clearCookie('userId');
            return res.redirect('/');
        } else {
            return res.redirect('/'); 
        }
    } 
};

module.exports = profileController;