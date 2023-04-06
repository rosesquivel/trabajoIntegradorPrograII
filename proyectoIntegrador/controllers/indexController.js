let db = require('../db/data');
let indexController = {
    index: function (req, res) {
        return res.render('index', {
            product: db.products
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