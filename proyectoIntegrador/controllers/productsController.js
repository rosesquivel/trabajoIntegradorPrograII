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
            res.locals.errors = errors
            return res.render(`/products/id/${id}`)
        } else if (form.comment === '') {
            errors.message = 'Ningún campo puede quedar vacío'
            res.locals.errors = errors
            return res.render(`/products/id/${id}`)
        } else {
            //Recopilo los datos del form
            comment.comment = form.comment,
            comment.idProduct = req.params.id,
            comment.userId = req.session.user.id
        }

        let viewComments = {
            order: [
                ["createdAt", 'DESC']
            ]
        };
        db.Comment.create(comment, viewComments)
            .then(function (result) {
                // return res.send(result)
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

        let product = {};

        let errors = {}
        if (form.name === '' || form.longDescription === '' || form.shortDescription === '' ) { //si ponemos la imagen tendria q estar aca yb
            errors.message = 'Ningún campo puede quedar vacío'
            res.locals.errors = errors
            return res.render('product-add')
        } else {
            //Recopilo los datos del form
            product.name = form.name,
                product.longDescription = form.longDescription,
                product.shortDescription = form.shortDescription,
                // product.image = req.file.filename, ver bien como hariamos en el caso de la imgaen
                product.userId = req.session.user.id
        }

        //Guardo los datos con el método Create
        db.Product.create(product)
            .then(function (newProduct) {
                return res.redirect('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    formEdit: function (req, res) {
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

                let rel = {
                    where: {
                        id: id
                    }
                }

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
    search: function (req, res) {
        let results = req.query.search;
        let rel = {
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