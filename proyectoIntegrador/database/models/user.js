module.exports = function (sequelize, dataTypes) {
    let alias = 'User';
    let cols = {
        id: {
            autoincrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER  

        },
        userName: {

        },
        email: {
            type: dataTypes.STRING

        },
        password: {
            type: dataTypes.STRING
        },
        profilePicture: {
            type: dataType.STRING
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
    let User = sequelize.define(alias, cols, config);
    return User;
}