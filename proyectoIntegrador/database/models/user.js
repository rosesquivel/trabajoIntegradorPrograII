module.exports = function (sequelize, dataTypes) {
    let alias = 'User';

    let cols = {
        id: {
            autoincrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER  

        },
        username: {
            type: dataTypes.STRING

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
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
    };
    
    let User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
         User.hasMany(models.Product, {
             as: 'products',
             foreignKey: 'userId'
         }),
         User.hasMany(models.Comment), {
             as: 'comments',
             foreignKey: 'userId'
         }
    }
    return User;
}