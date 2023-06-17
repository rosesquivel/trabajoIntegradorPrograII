const { name } = require("ejs");
let db = require('../database/models');
let op = db.Sequelize.Op;

let productsController = {
    product: function (req, res) {
        let rel = {
            order: [
                ['comments', 'createdAt', 'DESC']
            ],
            include: [
                { association: "user" },
                {
                    association: "comments",
                    include: [
                        { association: "user" },
                        { association: "product" }
                    ]
                }
            ]
        };

        let id = req.params.id;

        db.Product.findByPk(id, rel)
            .then(function (oneProduct) {
                return res.render('product', {
                    product: oneProduct
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    storeComment: function (req, res) {
        let form = req.body;
        let id = req.params.id;
        let errors = {}

        let viewComments = {
            comment: req.body.comment,
            idProduct: req.params.id,
            userId: req.session.user.id 
            }
        db.Comment.create(viewComments)
        .then(function (result) {
            return res.redirect(`/products/id/${id}`)
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    add: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/');
        } else {
            return res.render('product-add');
        }
    },
    storeProduct: function (req, res) {
        let form = req.body;
        let errors = {};

        if (form.name == '') { 
            errors.message = 'Es necesario añadir un nombre'
            res.locals.errors = errors;
            return res.render('product-add');

        } else if (form.longDescription == '') {
            errors.message = 'Es necesario añadir una descripción detallada'
            res.locals.errors = errors;
            return res.render('product-add');

        } else if (form.shortDescription == ''){
            errors.message = 'Es necesario añadir una breve descripción'
            res.locals.errors = errors;
            return res.render('product-add');

        } else {
            let image = '/images/makeup/product.png';
            if (form.image != ''){
                image = form.image;
            }

            let newProduct = {
                name: form.name,
                longDescription: form.longDescription,
                shortDescription: form.shortDescription,
                image: image,
                userId: req.session.user.id
            };  
            db.Product.create(newProduct)
            .then(function (result) {
                return res.redirect('/')
            })
            .catch(function (error) {
                console.log(error);
            }); 
        } 
    },
    edit: function (req, res) {
        if (req.session.user != undefined) {
            let id = req.params.id;

            db.Product.findByPk(id)
                .then(function (oneProduct) {
                    if (oneProduct != undefined) {
                        if (req.session.user.id != oneProduct.userId) {
                            return res.redirect('/')
                        } else {
                            return res.render('product-edit', { product: oneProduct })
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            return res.redirect('/profile/login')
        }

    },
    productEdit: function (req, res) {
        let id = req.params.id;
        let form = req.body;
        let idUsuario = req.session.user.id;

        let product = {
            userId: idUsuario
        }

        db.Product.findByPk(id)
            .then(function (oneProduct) {

                if (form.name == '') {
                    product.name = oneProduct.name
                } else {
                    product.name = form.name
                }

                if (form.longDescription == '') {
                    product.longDescription = oneProduct.longDescription
                } else {
                    product.longDescription = form.longDescription
                }

                if (form.shortDescription == '') {
                    product.shortDescription = oneProduct.shortDescription
                } else {
                    product.shortDescription = form.shortDescription
                }

                if (form.image == '') {
                    product.image = oneProduct.image
                } else {
                    product.image = form.image
                }

                let rel = {where: {id: id}}

                db.Product.update(product, rel)
                    .then(function (result) {
                        return res.redirect(`/products/id/${id}`)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    searchProducts: function (req, res) {
        let results = req.query.search;
        let rel = {
            order: [
                ['createdAt', 'DESC']
            ],
            where: [
                {
                    [op.or]: [
                        { name: { [op.like]: `%${results}%` } },
                        { longDescription: { [op.like]: `%${results}%` } },
                        { shortDescription: { [op.like]: `%${results}%` } }
                    ]
                }
            ],
            include: [
                { association: "user" },
                { association: "comments" }
            ]
        };
        db.Product.findAll(rel)
            .then(function (searchProducts) {
                return res.render('search-results', {
                    results: results,
                    product: searchProducts
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    productDelete: function (req, res) {
        let idProduct = req.body.id;
       
        db.Comment.destroy(
            {where: {idProduct: idProduct}})
            .then (function (results){
                db.Product.destroy(
                { where: { id: idProduct} }
                )
            })
            .then(function () {
                res.redirect('/profile/id/' + req.session.user.id)
            })
            .catch(function (error) {
                res.send(error);
            })
    }
};

module.exports = productsController;