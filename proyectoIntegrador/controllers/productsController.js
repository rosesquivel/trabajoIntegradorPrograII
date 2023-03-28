let productsController = {
    products: function(req, res){
        return res.render('product')
    }, 
    add: function(req, res){
        return res.render('product-add')
    },
    results: function(req, res){
        return res.render('search-results')
    }

}

module.exports = productsController;