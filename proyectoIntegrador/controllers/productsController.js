const { name } = require("ejs");
let db = require('../database/models');
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let productsController = {
    product: function(req, res){
        let rel = {
            include: [
                { association: "user"},
                { association: "comments"}
                ]
            };            
        let id = req.params.id;
        db.Product.findByPk(id, rel)
        .then(function(oneProduct){
            return res.send(oneProduct)
            //return res.render('product', {product: oneProduct})
        })
        .catch(function(error){
            console.log(error);
        })
    }, 
    add: function(req, res){
        return res.render('product-add', {
            users: db.users
        })
    },
    edit: function(req, res){
        return res.render('product-edit', {
            users: db.users
        })
    },
    search: function(req, res){
        return res.render('search-results', {
            product: db.products
        })
    }
};

module.exports = productsController;
