const { name } = require("ejs");
let db = require("../database/models");
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let productsController = {
    product: function(req, res){
        db.Product.findAll({
            include: [
                {association: 'User'},
                {association: 'Comments'}
            ]
            }
        )
        .then(function(ProductAll){
            return res.send(ProductAll)
        })
        .catch(function(error){
            console.log(error);
        })

        /* let id = req.params.id;
        let list = [];
        for(let i=0; i < db.products.length; i++){
            if(id == db.products[i].id){
                list.push(db.products[i])
            }
        }
        return res.render('product', {
            product: list,
            comments: db.comments,
        }) */
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
