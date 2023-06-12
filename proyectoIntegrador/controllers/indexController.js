let db = require('../database/models');
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let indexController = {
    index: function(req, res){
        let rel = {
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                { association: "user"},
                { association: "comments"}
                ]
            };
        db.Product.findAll(rel)
        .then(function(productsAll){
            return res.render('index', {
            product: productsAll
        });
        })
        .catch( function(error){
            console.log(error);
        })
    }
}

module.exports = indexController;