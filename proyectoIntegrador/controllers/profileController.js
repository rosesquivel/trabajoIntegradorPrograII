let profileController = {
    profile: function(req, res){
        return res.render('profile')
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