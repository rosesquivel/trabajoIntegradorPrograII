let db = require('../db/data');
let productsController = {
    product: function(req, res){
        return res.render('product', {
            product: db.products,
            comments: db.comments,
        })
    }, 
    add: function(req, res){
        return res.render('product-add')
    },
    edit: function(req, res){
        return res.render('product-edit')
    },
    results: function(req, res){
        return res.render('search-results', {
            product: db.products
        })
    }
};

module.exports = productsController;
