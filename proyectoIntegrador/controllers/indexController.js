const { name } = require("ejs");
let db = require("../database/models");
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

let indexController = {
    index: function (req, res) {
        return res.render('index', {
            product: db.products
        })
    }
};

module.exports = indexController;
 