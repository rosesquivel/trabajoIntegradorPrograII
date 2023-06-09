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
        userId: {
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

    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
             as: 'user',
             foreignKey: 'userId'
         }),
        Comment.belongsTo(models.Product, {
             as: 'product',
             foreignKey: 'idProduct'
         })
     }
    return Comment;
}