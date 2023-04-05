let db = require('../db/makeup');
let indexController = {
    index: function (req, res) {
        return res.render('index', {
            list: db.lista
        })
    },
    add: function(req,res){
        return res.render('product-add')
    },
    results: function (req,res) {
        return res.render('search-results')
    }
};



module.exports = indexController;