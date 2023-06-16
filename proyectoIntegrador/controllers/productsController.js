const { name } = require("ejs");
//Requiero la biblioteca necesaria para poder usar document.querySelector
/* const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const document = dom.window.document; */
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

        //Encuentra el producto con la pk
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

        let comment = {
            comment: '',
            idProduct: '',
            userId: '',
        };

        let errors = {}
        if (req.session.user == undefined) {
            errors.message = 'Se debe loguear para comentar'
            res.locals.errors = errors;
            return res.render(`/products/id/${id}`);

        } else if (form.comment == '') {
            errors.message = 'Ningún campo puede quedar vacío'
            res.locals.errors = errors;
            return res.render(`/products/id/${id}`);

        } else {
            comment.comment = form.comment,
            comment.idProduct = req.params.id,
            comment.userId = req.session.user.id
        }

        db.Comment.create(comment, viewComments)
            .then(function (result) {
                return res.redirect(`/products/id/${req.params.id}`)
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    storeLike: function (req, res) {
        let like = req.body.likear;

        //if (like == 'yes')
        return res.send(like)
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

                if (form.nombre == '') {
                    product.name = oneProduct.name
                } else {
                    product.name = form.nombre
                }

                if (form.descripcion_detallada == '') {
                    product.longDescription = oneProduct.longDescription
                } else {
                    product.longDescription = form.descripcion_detallada
                }

                if (form.descripcion_breve == '') {
                    product.shortDescription = oneProduct.shortDescription
                } else {
                    product.shortDescription = form.descripcion_breve
                }

                if (form.images == '') {
                    product.image = oneProduct.image
                } else {
                    product.image = form.images
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
        // res.send(idProduct)
        let product = {
            where: {
                id: idProduct
            },
            force: true
        };

        db.Product.destroy(product)
            .then(function (results) {
                return res.redirect(`/profile/id/${req.session.user.id}`)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
};

module.exports = productsController;