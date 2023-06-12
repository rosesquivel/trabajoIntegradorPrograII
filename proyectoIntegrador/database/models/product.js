module.exports = function (sequelize, dataTypes) {
    let alias = 'Product';

    let cols = {
        id: {
            autoincrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER 
        },
        name: {
            type: dataTypes.STRING
        },
        longDescription: {
            type: dataTypes.STRING
        },
        shortDescription: {
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        },
        userId: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
    };

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
         Product.belongsTo(models.User, {
             as: 'user',
             foreignKey: 'userId'
         }),
         Product.hasMany(models.Comment, {
             as: 'comments',
             foreignKey: 'idProduct'
         })
    }
    return Product;
}