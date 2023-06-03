module.exports = function (sequelize, dataTypes) {
    let alias = 'Comment';
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
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        }
  


    };
    let Comment = sequelize.define(alias, cols, config);
    return Comment;
}