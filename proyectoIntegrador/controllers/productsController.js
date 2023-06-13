const { name } = require("ejs");
let db = require('../database/models');
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let productsController = {
    product: function(req, res){
        let rel = {
            include: [
                { association: "user"},
                { association: "comments",
                    include: [
                        { association: "user"},
                        { association: "product"}
                    ]
                }
                ]
            };  

        let id = req.params.id;

        //Encuentra el producto con la pk
        db.Product.findByPk(id, rel)
        .then(function(oneProduct){
            return res.render('product', {
                product: oneProduct
           });
        })
        .catch(function(error){
            console.log(error);
        });
    }, 
    storeComment: function(req, res){
        let form = req.body; 

        //Recopilo los datos del form
        let comment = {
            comment: form.comment,
            idProduct: req.params.id,
            userId: req.session.user.id
        }
        let viewComments = {
            order: [
                ["createdAt", 'DESC']
            ]
        }
        db.Comment.create(comment, viewComments)
        .then(function(result){
            return res.redirect(`/products/id/${req.params.id}`)
        })
        .catch( function(error){
            console.log(error);
        });
    },
    add: function(req, res){
        if(req.session.user == undefined){
            return res.redirect('/');
        } else{
            return res.render('product-add');
        }
    },
    storeProduct: function(req, res){
        let form = req.body;

        //Recopilo los datos del form
        let product = {
            name: form.name,
            longDescription: form.longDescription,
            shortDescription: form.shortDescription,
            image: form.image,
            userId: req.session.user.id
        };

        //Guardo los datos con el método Create
        db.Product.create(product)
        .then(function(newProduct){
            return res.redirect('/')
        })
        .catch( function(error){
            console.log(error);
        });
    },

    formEdit: function(req, res){
        return res.render('product-edit', {
            users: db.users
        })
    },
    productEdit: function(req, res) {
        
    },
    search: function(req, res){
        let results = req.query.search;
        let rel = {
            where: [
                {[op.or]: [
                    {name: {[op.like]: `%${results}%`}},
                    {longDescription: {[op.like]: `%${results}%`}},
                    {shortDescription: {[op.like]: `%${results}%`}}
                ]}
            ],
            include: [
                { association: "user"},
                { association: "comments"}
                ]
        };
        db.Product.findAll(rel)
        .then(function(searchProducts){
            return res.render('search-results', {
                results: results,
                products: searchProducts
        });   
        })
        .catch(function(error){
            console.log(error);
        })
    },
    productDelete: function(req, res){
        let idProduct = req.body.id;
        let product = {where: [{id: idProduct}]};

        db.Product.destroy(product)
        .then(function(results){
            return res.redirect(`/profile/id/${req.session.user.id}`)
        })
        .catch(function(error){
            console.log(error);
        })
    } 
};

module.exports = productsController;