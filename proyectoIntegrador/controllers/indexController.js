let db = require('../database/models');
let op = db.Sequelize.Op;
let bcriptjs = require('bcryptjs');

// let indexController = {
//     index: function (req, res) {
//         //return res.send(db.Product)
//         // return res.render('index', {
//         //     product: db.products
//         // })
//     }
// };

let indexController = {
    index: function(req, res){
        let rel = {
            include: {
              all:true,
              nested: true
            }}
        db.Product.findAll({
            order: [
                ['createdAt', 'DESC'], //para que sea real deberíamos usar id
            ]
        })
    .then( function(productsAll){
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
 