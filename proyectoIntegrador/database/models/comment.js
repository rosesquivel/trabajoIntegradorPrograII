module.exports = function (sequelize, dataTypes) {
    let alias = 'Comment';
    let cols = {
        id: {
            autoincrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER  

        },
        idProduct: {
            type: dataTypes.INTEGER

        },
        idUser: {
            type: dataTypes.INTEGER
        },
        comment: {
            type: dataTypes.STRING
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        }
    };
    let config = {

    };
    let Comment = sequelize.define(alias, cols, config);
    // User.associate = function (models) {
    //     User.hasMany(models.User, {
    //         as: 'User',
    //         foreingKey: 'idUser'
    //     }),
    //     User.belongsTo(models.Product, {
    //         as: 'Product',
    //         foreingKey: 'idProduct'
    //     })
    // }
    return Comment;
}