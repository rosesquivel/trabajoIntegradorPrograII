const { name } = require("ejs");
let db = require("../database/models");
let op = db.Sequelize.Op;
let bcryptjs = require('bcryptjs');

let profileController = {
    profile: function(req, res){
        let id = req.params.id;
        let rel ={
            order: [
                ['products', 'createdAt', 'DESC']
            ],
            include: [
                { association: 'products',
                    include: [
                        { association: 'comments'}
                    ]}
            ]
        };
        db.User.findByPk(id, rel)
        .then(function(results){
            let session = req.session.user;
            if(session != undefined && id == req.session.user.id){
                res.locals.user = results.dataValues;
                return res.render('profile', {
                    profile: results
                });
            } else {
                return res.render('otherProfile', {
                    profile: results
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    },
    edit: function(req, res){
        if (req.session.user != undefined) {
            let id = req.session.user.id;

            db.User.findByPk(id)
            .then(function(oneProfile){
                return res.render('profile-edit', {
                    user: oneProfile
                });
            })
            .catch(function(error) {
                console.log(error);
            });

        } else {
            return res.redirect('/profile/login')
        }
    },
    editProfile: function(req, res){
        let infoPerfil = req.body;
        let id = req.session.user.id;
        let filtrado = {
          where : [
            {id: id}
          ]
        }
        db.User.update(infoPerfil, filtrado)
        .then(function(resultado) {
            req.session.user = resultado.dataValues
            return res.redirect('/')
        }).catch(function(error) {
          console.log(error);
        });
    },
    register: function(req, res){
        if (req.session.user != undefined){
            return res.redirect('/');
        } else {
            return res.render('register');
        };
    },
    storeRegister: function(req, res){ 
        let form = req.body;
        let errors ={};
        
        db.User.findOne({
            where: [{email: form.email}]
        })

        .then(function(userFound){  
            if (userFound != null){ //compara el email ingresado con los de la base de datos
                errors.message = "El email ingresado ya existe";
                res.locals.errors = errors;
                return res.render('register');
        } 
    })
        .catch(function(error){
            console.log(error);
        })

        if (form.email == ''){
            errors.message = 'Debes ingresar un email'
            res.locals.errors = errors;
            return res.render('register');

        } else if (form.password == ''){
            errors.message = 'Debes ingresar una contraseña'
            res.locals.errors = errors;
            return res.render('register');

        } else if (form.password.length <= 3){
            errors.message = 'La contraseña debe tener más de 3 dígitos'
            res.locals.errors = errors;
            return res.render('register');

        } else if (form.bDate == ''){ 
        errors.message = 'Debes ingresar tu fecha de nacimiento'
        res.locals.errors = errors;
        return res.render('register');

        } else if (form.phone == ''){
        errors.message = 'Debes ingresar tu número de teléfono'
        res.locals.errors = errors;
        return res.render('register')

        } else if (form.dni == ''){
        errors.message = 'Debes ingresar tu número de documento'
        res.locals.errors = errors;
        return res.render('register')

        } else{
        let profilePicture = '/images/users/user.png';
        if (form.profilePicture != ''){
            profilePicture = form.profilePicture;
        }

        let newUser = {
            username: form.username,
            email:form.email,
            password: bcryptjs.hashSync(form.password, 10), //encripto la contraseña
            profilePicture: profilePicture,
            bDate: form.bDate,
            dni: form.dni,
            phone: form.phone
        };

        db.User.create(newUser)
            .then(function(result){
                return res.redirect('/profile/login');
            })
            .catch(function(error){
                console.log(error);
            })
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
        let form = req.body;
        let emailForm = form.email;
        let passwordForm = form.password;

        let errors ={};

        if(emailForm == ''){
            errors.message = 'Debes ingresar un email'
            res.locals.errors = errors;
            return res.render('login');
        } else if (passwordForm == ''){
            errors.message = 'Debes ingresar una contraseña'
            res.locals.errors = errors;
            return res.render('login');
        } else{
            db.User.findOne({
                where: [{email: emailForm}]
            })

            .then(function(userFound){        
                if (userFound != undefined){ //si el usuario esta ok, que evalue la contraseña
                    
                    let compare = bcryptjs.compareSync(passwordForm, userFound.password);
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
                    }
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
    },
    searchUsers: function(req, res){
        let results = req.query.search;
        let rel = {
            where: [
                {
                    [op.or]: [
                        { username: { [op.like]: `%${results}%` } },
                        { email: { [op.like]: `%${results}%` } }
                    ]
                }
            ],
            include: [
                { association: "products" }
            ]
        };
        db.User.findAll(rel)
            .then(function (searchUsers) {
                
                return res.render('results-users', {
                    results: results,
                    resultsUser: searchUsers
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
};

module.exports = profileController;