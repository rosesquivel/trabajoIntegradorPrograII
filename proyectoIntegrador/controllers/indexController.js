let db = require('../db/makeup');
let indexController = {
    index: function (req, res) {
        return res.render('index', {
            list: db.lista
        })
    }
};



module.exports = indexController;