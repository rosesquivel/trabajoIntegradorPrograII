let db = require('../db/data');
let profileController = {
    profile: function(req, res){
        return res.render('profile', {
            product: db.products
        })
    },
    edit: function(req, res){
        return res.render('profile-edit')
    },
    register: function(req, res){
        return res.render('register')
    },
    login: function(req,res){
        return res.render('login')
    }
}

module.exports = profileController;