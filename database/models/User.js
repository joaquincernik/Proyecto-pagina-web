module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users'
    let columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }
    let config = {
        tableName: 'User',
        timestamps: false  
    }
    const User = sequelize.define(alias, columns, config)

    
    return User
}