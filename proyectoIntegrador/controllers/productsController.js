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
/*            return res.render('product', 
            {product: oneProduct,
            comments: oneProduct.comments})  */
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
        let id = req.query.search;
        let rel = {
        where: [
            {name: {[op.like]: `%${id}%`}}
        ],
        include: [
            { association: "user"},
            { association: "comments"}
            ]
        };
        db.Product.findAll(rel)
        .then(function(searchProducts){
            return res.render('search-results', {
            products: searchProducts
        });   
        })
        .catch( function(error){
            console.log(error);
        })
        /* return res.render('search-results', {
            product: db.products
        }) */
    }
};

module.exports = productsController;
