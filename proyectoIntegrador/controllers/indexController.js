let db = require('../db/data');
let indexController = {
    index: function (req, res) {
        return res.render('index', {
            product: db.products
        })
    }
};

module.exports = indexController;