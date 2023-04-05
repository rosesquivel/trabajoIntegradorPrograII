let db = require("../db/makeup");
let productsController = {
    product: function(req, res){
        return res.render('product', 
        {lista: db.lista,
         comentarios: db.comentarios
        })
    }, 
    add: function(req, res){
        return res.render('product-add')
    },
    results: function(req, res){
        return res.render('search-results')
    }

}

module.exports = productsController;