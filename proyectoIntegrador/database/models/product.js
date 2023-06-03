module.exports = function (sequelize, dataTypes) {
    let alias = 'Product';
    let cols = {
        id: {
            autoincrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER  

        },
        email: {
            type: dataTypes.STRING

        },
        password: {
            type: dataTypes.STRING
        },
        profilePicture: {
            type: dataTypes.STRING
        },
        bDate:{
            type: dataTypes.DATE
        },
        dni: {
            type: dataTypes.INTEGER
        },
        phone: {
            type: dataTypes.INTEGER
        },
  
   
        
    

    };
    let Product = sequelize.define(alias, cols, config);
    return Product;
}